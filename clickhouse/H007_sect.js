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
    let req_body = {...req.body.header, ...req.body.body, date_time: setDateTime.setDateTime()};

    const contents = `${req_body.message_id}`+'\',\''+`${req_body.keeper_id}`+'\',\''+`${req_body.send_time}`+'\',\''+`${req_body.anomaly_seq}`+'\',\''+`${req_body.unit_id}`
        +'\',\''+`${req_body.make_id}`+'\',\''+`${req_body.anomaly_type}`+'\',\''+`${req_body.protocol_type}`+'\',\''+`${req_body.protocol_detail}`+'\',\''+`${req_body.src_ip}`+'\',\''+`${req_body.src_mac}`
        +'\',\''+`${req_body.src_port}`+'\',\''+`${req_body.dst_ip}`+'\',\''+`${req_body.dst_mac}`+'\',\''+`${req_body.dst_port}`+'\',\''+`${req_body.payload}`+'\',\''+`${req_body.packet_code}`
        +'\',\''+`${req_body.policy_name}`+'\',\''+`${req_body.packet_time}`+'\',\''+`${req_body.event_time}`+'\',\''+'';

    const query =
        `insert into dti.${tableName} VALUES (\'${contents}\')`
    ;

    const sel_query = `select anomaly_type from dti.motie_amly_H007 where anomaly_seq = '${req_body.anomaly_seq}'`;

    let rtnResult = {};
    try {
        const in_seq = await clickhouse.query(sel_query).toPromise();

        if (in_seq instanceof Error) {
            throw new Error(in_seq);
        }
        else if (in_seq.length) {
            winston.info("******************************** 같은 anomaly_seq 의 데이터가 있어, Insert 하지 않습니다. ( "+ req_body.anomaly_seq +" ) *********************************");
        }
        else {
            let rslt = await clickhouse.query(query).toPromise();

            //winston.info(query);
            if (rslt instanceof Error) {
                throw new Error(rslt);
            }
            winston.info("******************* CH query end (정상처리) *************************");
        }

    } catch (error) {
        winston.error(error.stack);
        rtnResult = error;
    } finally {
        return rtnResult;
    }
};