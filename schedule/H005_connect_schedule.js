const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const makejson = require('../utils/makejson');
const {QueryTypes} = require('sequelize');

const obc = require('../utils/objectconvert');
const keychange = require('../utils/KeyChange');

const db = require('../models');
const H005=require('../service/H005_bw');

const tableName = process.env.BW_LIST_TABLE;
const param_tableName = process.env.SRCIP_LIST_HISTORY_TABLE;

exports.scheduleInsert = () => {
    schedule.scheduleJob('49 * * * * *', function() {
        // state C 인 경우(생성)
        const result_C = db.sequelize.transaction(async (t) => {
            let rslt = await db.sequelize.query(
                `select concat(\'${process.env.UNIT_PREFIX}\', unit) AS unit, ` +
                `concat(\'${process.env.UNIT_PREFIX}\', unit, '_', make) AS make, ` +
                `protocolType AS protocol_type, detailProtocol AS protocol_detail, srcIp AS src_ip, dstIp AS dst_ip, srcPort AS src_port, dstPort AS dst_port from communi_white_list ` +
                'where state= \'C\' '
                ,{
                    type: QueryTypes.SELECT
                }
            ).then(async users =>{
                keychange.KeyChange_h005(users);
                const child_users =  obc.obConvert_connect(users);

                for (let k of child_users){
                    let value = makejson.makeReqData_H005_connect(k, 11);
                    let options = {
                        uri: process.env.ANOMAL_ADDRESS,
                        method: 'POST',
                        body: value,
                        json: true
                    };
                    httpcall.httpReq(options, async function (err) {
                        if (err) {
                            console.log("HTTP CALL Error!");
                        }
                    });
                    H005.parseAndInsert(value, param_tableName);
                }

                let rt = await db[tableName.toUpperCase()].update({state : 'E'},
                    {
                        where: {
                            state: '' //테스트를 위해 비워둠 (실제 값 C)
                        }
                    });
                if(rt instanceof Error){
                    throw new Error(rt);
                }
            });

            if(rslt instanceof Error){
                throw new Error(rslt);
            }
        });

        //state D인 경우
        const result_D = db.sequelize.transaction(async (t) => {
            let rslt = await db.sequelize.query(
                `select concat(\'${process.env.UNIT_PREFIX}\', unit) AS unit, ` +
                `concat(\'${process.env.UNIT_PREFIX}\', unit, '_', make) AS make, ` +
                `protocolType AS protocol_type, detailProtocol AS protocol_detail, srcIp AS src_ip, dstIp AS dst_ip, srcPort AS src_port, dstPort AS dst_port from communi_white_list ` +
                'where state= \'D\' '
                ,{
                    type: QueryTypes.SELECT
                }
            ).then(async users =>{
                keychange.KeyChange_h005(users);
                const child_users =  obc.obConvert_connect(users);

                for (let k of child_users){
                    let value = makejson.makeReqData_H005_connect(k, 12);
                    let options = {
                        uri: process.env.ANOMAL_ADDRESS,
                        method: 'POST',
                        body: value,
                        json: true
                    };
                    httpcall.httpReq(options, async function (err) {
                        if (err) {
                            console.log("HTTP CALL Error!");
                        }
                    });
                    H005.parseAndInsert(value, param_tableName);
                }

                let rt = await db[tableName.toUpperCase()].update({state : 'E'},
                    {
                        where: {
                            state: '' //테스트를 위해 비워둠 (실제 값 D)
                        }
                    });
                if(rt instanceof Error){
                    throw new Error(rt);
                }
            });

            if(rslt instanceof Error){
                throw new Error(rslt);
            }
        });

        //state 가 U인 경우
        const result_U = db.sequelize.transaction(async (t) => {
            let rslt = await db.sequelize.query(
                'select * from communi_white_list ' +
                'where state= \'U\' '
                ,{
                    type: QueryTypes.SELECT
                }
            ).then(async users =>{
                //전체 찾기
                let rs = await db.sequelize.query(
                    `select concat(\'${process.env.UNIT_PREFIX}\', unit) AS unit, ` +
                    `concat(\'${process.env.UNIT_PREFIX}\', unit, '_', make) AS make, ` +
                    `protocolType AS protocol_type, detailProtocol AS protocol_detail, srcIp AS src_ip, dstIp AS dst_ip, srcPort AS src_port, dstPort AS dst_port from communi_white_list ` +
                    'where state != \'D\' '
                    ,{
                        type: QueryTypes.SELECT
                    }
                ).then(async users => {
                    keychange.KeyChange_h005(users);
                    const child_users =  obc.obConvert_connect(users);
                    for (let k of child_users){
                        let value = makejson.makeReqData_H005_connect(k, 10);
                        let options = {
                            uri: process.env.ANOMAL_ADDRESS,
                            method: 'POST',
                            body: value,
                            json: true
                        };
                        httpcall.httpReq(options, async function (err) {
                            if (err) {
                                console.log("HTTP CALL Error!");
                            }
                        });
                        H005.parseAndInsert(value, param_tableName);
                    }
                });
                if(rs instanceof Error){
                    throw new Error(rs);
                }

                let rt = await db[tableName.toUpperCase()].update({state : 'E'},
                    {
                        where: {
                            state: '' //테스트를 위해 비워둠 (상태 D가 아닌것은 다 바꾸기)
                        }
                    });
                if(rt instanceof Error){
                    throw new Error(rt);
                }
            });
            if(rslt instanceof Error){
                throw new Error(rslt);
            }
        });
    })
};