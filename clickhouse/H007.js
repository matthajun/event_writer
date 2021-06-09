const winston = require('../config/winston')(module);
const setDateTime = require('../utils/setDateTime');
const sequelize = require('sequelize');
const db = require('../models');

const {ClickHouse} = require('clickhouse');
const clickhouse = new ClickHouse({
    url: process.env.CH_ADDRESS,
    port: 8124,
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

    const contents = `${req_body.message_id}`+'\',\''+`${req_body.keeper_id}`+'\',\''+`${req_body.send_time}`+'\',\''+`${req_body.unit_id}`
        +'\',\''+`${req_body.make_id}`+'\',\''+`${req_body.anomaly_type}`+'\',\''+`${req_body.protocol_type}`+'\',\''+`${req_body.protocol_detail}`+'\',\''+`${req_body.src_ip}`+'\',\''+`${req_body.src_mac}`
        +'\',\''+`${req_body.src_port}`+'\',\''+`${req_body.dst_ip}`+'\',\''+`${req_body.dst_mac}`+'\',\''+`${req_body.dst_port}`+'\',\''+`${req_body.payload}`+'\',\''+`${req_body.packet_code}`
        +'\',\''+`${req_body.policy_name}`+'\',\''+`${req_body.packet_time}`+'\',\''+`${req_body.event_time}`+'\',\''+`${req_body.date_time}`;

    const queries = [
        `insert into dti.${tableName} VALUES (\'${contents}\')`
    ];
    let rtnResult = {};
    try {

        const trans = await db.sequelize.transaction(async (t) => {
            winston.info("********************************************************************************");
            winston.info("******************* CH query start *************************");
            for (const query of queries) {
                let rslt = await clickhouse.query(query).toPromise();

                winston.info(query);
                if (rslt instanceof Error) {
                    throw new Error(rslt);
                }
            }
            winston.info("********************************************************************************");
            winston.info("******************* CH query end *************************");
        })

    } catch (error) {
        winston.error(error.stack);
        rtnResult = error;
    } finally {
        return rtnResult;
    }
};