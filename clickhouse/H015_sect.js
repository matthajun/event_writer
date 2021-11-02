const winston = require('../config/winston')(module);
const setDateTime = require('../utils/setDateTime');

const {ClickHouse} = require('clickhouse');
const clickhouse = new ClickHouse({
    url: process.env.SECT_CH_ADDRESS,
    port: 8125,
    debug: false,
    basicAuth: null,
    isUseGzip: false,
    format: "json",
    config: {
        session_timeout                         : 30,
        output_format_json_quote_64bit_integers : 0,
        enable_http_compression                 : 0,
        database                                : 'dti',
    },
});

const tableName = process.env.CH_H007;
const timer = ms => new Promise(res => setTimeout(res, ms));

module.exports.parseAndInsert = async function(req) {
    let req_header = {...req.body.header, date_time: setDateTime.setDateTime()};
    let bodies = req.body.body.event_list;
    let seq_array = [];

    let rtnResult = {};

    try {
        for (req_body of bodies) {
            const query = `select anomaly_type from dti.motie_amly_H007 where anomaly_seq = '${req_body.anomaly_seq}'`;
            const in_seq = await clickhouse.query(query).toPromise();

            const contents = `insert into dti.${tableName} VALUES (\'`+`${req_header.message_id}` + '\',\'' + `${req_header.keeper_id}` + '\',\'' + `${req_header.send_time}` + '\',\'' + `${req_body.anomaly_seq}` + '\',\'' + `${req_body.unit_id}`
                + '\',\'' + `${req_body.make_id}` + '\',\'' + `${req_body.anomaly_type}` + '\',\'' + `${req_body.protocol_type}` + '\',\'' + `${req_body.protocol_detail}` + '\',\'' + `${req_body.src_ip}` + '\',\'' + `${req_body.src_mac}`
                + '\',\'' + `${req_body.src_port}` + '\',\'' + `${req_body.dst_ip}` + '\',\'' + `${req_body.dst_mac}` + '\',\'' + `${req_body.dst_port}` + '\',\'' + `${req_body.payload}` + '\',\'' + `${req_body.packet_code}`
                + '\',\'' + `${req_body.policy_name}` + '\',\'' + `${req_body.packet_time}` + '\',\'' + `${req_body.event_time}` + '\',\'' + ''+ `\')`;

            if (in_seq instanceof Error) {
                throw new Error(in_seq);
            }
            else if (in_seq.length) {
                winston.info("******************************** 같은 anomaly_seq 의 데이터가 있어, Insert 하지 않습니다. ( "+ req_body.anomaly_seq +" ) *********************************");
                seq_array.push(req_body.anomaly_seq);
            }
            else {
                let rslt = await clickhouse.query(contents).toPromise();
                //winston.info(JSON.stringify(req_body));

                if (rslt instanceof Error) {
                    throw new Error(rslt);
                }
                else {
                    seq_array.push(req_body.anomaly_seq);
                }
            }
            await timer(100);
        }
    } catch (error) {
        winston.error(error.stack);
        rtnResult = error;
    } finally {
        if(rtnResult instanceof Error)
            return rtnResult;
        else
            return seq_array;
    }
};