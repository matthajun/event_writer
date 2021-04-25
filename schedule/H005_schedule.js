const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const makejson = require('../utils/makejson');
const {QueryTypes} = require('sequelize');

const obc = require('../utils/objectconvert');
const keychange = require('../utils/KeyChange');

const db = require('../models');
const H005_bw=require('../service/H005_bw');
const H005 = require('../service/H005');

const tableName = process.env.BW_LIST_TABLE;
const param_tableName = process.env.BW_LIST_HISTORY_TABLE;

exports.scheduleInsert = () => {
    schedule.scheduleJob('47 * * * * *', function() {
        // state C 인 경우(생성)
        const result_C = db.sequelize.transaction(async (t) => {
            let rslt = await db.sequelize.query(
                `select concat(\'${process.env.UNIT_PREFIX}\',unit) AS unit, ` +
                `concat(\'${process.env.UNIT_PREFIX}\', unit, '_', make) AS make, ` +
                `port, ip, type from black_white_list ` +
                'where state= \'C\' '
                ,{
                    type: QueryTypes.SELECT
                }
            ).then(async users => {
                if(users.length){
                let blackInfos = [];
                let whiteInfos = [];

                for (let user of users) {
                    if (user.type === 0) { //blacklist 이다.
                        blackInfos.push(user);
                    } else { //whitelist 이다.
                        whiteInfos.push(user);
                    }
                }

                if (blackInfos) {
                    keychange.KeyChange_h005(blackInfos);
                    const child_blackInfos = obc.obConvert(blackInfos);

                    for (let k of child_blackInfos) {
                        let value = makejson.makeReqData_H005_bl(k, 11);

                        httpcall.Call('post', process.env.ANOMAL_ADDRESS, value, async function (err, res) {
                            H005.parseAndInsert(res);
                            if (err) {
                                console.log("HTTP CALL Error!");
                            }
                        });
                        H005_bw.parseAndInsert(value, param_tableName);
                    }
                }

                if (whiteInfos) {
                    keychange.KeyChange_h005(whiteInfos);
                    const child_whiteInfos = obc.obConvert(whiteInfos);

                    for (let k of child_whiteInfos) {
                        let value = makejson.makeReqData_H005_wh(k, 11);

                        httpcall.Call('post', process.env.ANOMAL_ADDRESS, value, async function (err, res) {
                            H005.parseAndInsert(res);
                            if (err) {
                                console.log("HTTP CALL Error!");
                            }
                        });
                        H005_bw.parseAndInsert(value, param_tableName);
                    }
                }
                let rt = await db[tableName.toUpperCase()].update({state: 'E'},
                    {
                        where: {
                            state: 'C' //테스트를 위해 비워둠 (실제 값 C)
                        }
                    });
                if (rt instanceof Error) {
                    throw new Error(rt);
                }
            }
            });

            if(rslt instanceof Error){
                throw new Error(rslt);
            }
        });
/*
        //state D인 경우 (삭제)
        const result_D = db.sequelize.transaction(async (t) => {
            let rslt = await db.sequelize.query(
                `select concat(\'${process.env.UNIT_PREFIX}\',unit) AS unit, ` +
                `concat(\'${process.env.UNIT_PREFIX}\', unit, '_', make) AS make, ` +
                `port, ip, type from black_white_list ` +
                'where state= \'D\' '
                ,{
                    type: QueryTypes.SELECT
                }
            ).then(async users => {
                if(users.length){
                let blackInfos = [];
                let whiteInfos = [];

                for (let user of users) {
                    if (user.type === 0) { //blacklist 이다.
                        blackInfos.push(user);
                    } else { //whitelist 이다.
                        whiteInfos.push(user);
                    }
                }

                if (blackInfos) {
                    keychange.KeyChange_h005(blackInfos);
                    const child_blackInfos = obc.obConvert(blackInfos);
                    for (let k of child_blackInfos) {
                        let value = makejson.makeReqData_H005_bl(k, 12);

                        httpcall.Call('post', process.env.ANOMAL_ADDRESS, value, async function (err, res) {
                            H005.parseAndInsert(res);
                            if (err) {
                                console.log("HTTP CALL Error!");
                            }
                        });
                        H005_bw.parseAndInsert(value, param_tableName);
                    }
                }

                if (whiteInfos) {
                    keychange.KeyChange_h005(whiteInfos);
                    const child_whiteInfos = obc.obConvert(whiteInfos);

                    for (let k of child_whiteInfos) {
                        let value = makejson.makeReqData_H005_wh(k, 12);

                        httpcall.Call('post', process.env.ANOMAL_ADDRESS, value, async function (err, res) {
                            H005.parseAndInsert(res);
                            if (err) {
                                console.log("HTTP CALL Error!");
                            }
                        });
                        H005_bw.parseAndInsert(value, param_tableName);
                    }
                }
            }
            });

            if(rslt instanceof Error){
                throw new Error(rslt);
            }
        });

        //state U인 경우 (업데이트)
        const result_U = db.sequelize.transaction(async (t) => {
            let rslt = await db.sequelize.query(
                'select * from black_white_list ' +
                'where state= \'U\' '
                ,{
                    type: QueryTypes.SELECT
                }
            ).then(async users => {
                if(users.length){
                //블랙리스트 전체 찾기
                let rs = await db.sequelize.query(
                    `select concat(\'${process.env.UNIT_PREFIX}\',unit) AS unit, ` +
                    `concat(\'${process.env.UNIT_PREFIX}\', unit, '_', make) AS make, ` +
                    `port, ip, type from black_white_list ` +
                    'where type= \'0\' and state != \'D\' '
                    , {
                        type: QueryTypes.SELECT
                    }
                ).then(async users => {
                    keychange.KeyChange_h005(users);
                    const child_blackInfos = obc.obConvert(users);

                    for (let k of child_blackInfos) {
                        let value = makejson.makeReqData_H005_bl(k, 10);

                        httpcall.Call('post', process.env.ANOMAL_ADDRESS, value, async function (err, res) {
                            H005.parseAndInsert(res);
                            if (err) {
                                console.log("HTTP CALL Error!");
                            }
                        });
                        H005_bw.parseAndInsert(value, param_tableName);
                    }
                });
                if (rs instanceof Error) {
                    throw new Error(rs);
                }

                //화이트리스트 전체 찾기
                let rs2 = await db.sequelize.query(
                    `select concat(\'${process.env.UNIT_PREFIX}\',unit) AS unit, ` +
                    `concat(\'${process.env.UNIT_PREFIX}\', unit, '_', make) AS make, ` +
                    `port, ip, type from black_white_list ` +
                    'where type= \'1\' and state != \'D\' '
                    , {
                        type: QueryTypes.SELECT
                    }
                ).then(async users => {
                    keychange.KeyChange_h005(users);
                    const child_blackInfos = obc.obConvert(users);

                    for (let k of child_blackInfos) {
                        let value = makejson.makeReqData_H005_wh(k, 10);

                        httpcall.Call('post', process.env.ANOMAL_ADDRESS, value, async function (err, res) {
                            H005.parseAndInsert(res);
                            if (err) {
                                console.log("HTTP CALL Error!");
                            }
                        });
                        H005_bw.parseAndInsert(value, param_tableName);
                    }
                });
                if (rs2 instanceof Error) {
                    throw new Error(rs2);
                }

                let rt = await db[tableName.toUpperCase()].update({state: 'E'},
                    {
                        where: {
                            state: 'U' //테스트를 위해 비워둠 (상태 D랑 I가 아닌것은 다 바꾸기)
                        }
                    });
                let rt2 = await db[tableName.toUpperCase()].update({state: 'E'},
                    {
                        where: {
                            state: 'I' //테스트를 위해 비워둠 (상태 D랑 I가 아닌것은 다 바꾸기)
                        }
                    });
                if (rt instanceof Error) {
                    throw new Error(rt);
                }
            }
            });
            if(rslt instanceof Error){
                throw new Error(rslt);
            }
        });*/
    })
};