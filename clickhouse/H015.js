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

module.exports.parseAndInsert = async function(req) {
    let req_body2 = {...req.body.header, date_time: setDateTime.setDateTime()};
    let bodies = req.body.body.event_list;
    let queries = [];

    for (req_body of bodies) {
        const contents = `${req_body2.message_id}` + '\',\'' + `${req_body2.keeper_id}` + '\',\'' + `${req_body2.send_time}` + '\',\'' + `${req_body.anomaly_seq}` + '\',\'' + `${req_body.unit_id}`
            + '\',\'' + `${req_body.make_id}` + '\',\'' + `${req_body.anomaly_type}` + '\',\'' + `${req_body.protocol_type}` + '\',\'' + `${req_body.protocol_detail}` + '\',\'' + `${req_body.src_ip}` + '\',\'' + `${req_body.src_mac}`
            + '\',\'' + `${req_body.src_port}` + '\',\'' + `${req_body.dst_ip}` + '\',\'' + `${req_body.dst_mac}` + '\',\'' + `${req_body.dst_port}` + '\',\'' + `${req_body.payload}` + '\',\'' + `${req_body.packet_code}`
            + '\',\'' + `${req_body.policy_name}` + '\',\'' + `${req_body.packet_time}` + '\',\'' + `${req_body.event_time}` + '\',\'' + `${req_body2.date_time}`;

        queries.push(
            `insert into dti.${tableName} VALUES (\'${contents}\')`);
    }

    let rtnResult = {};
    try {
        winston.info("******************* CH query start *************************");
        for (const query of queries) {
            let rslt = await clickhouse.query(query).toPromise();

            winston.info(query);
            if (rslt instanceof Error) {
                throw new Error(rslt);
            }
        }
        winston.info("******************* CH query end *************************");

    } catch (error) {
        winston.error(error.stack);
        rtnResult = error;
    } finally {
        return rtnResult;
    }
};