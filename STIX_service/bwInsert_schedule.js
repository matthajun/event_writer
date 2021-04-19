const winston = require('../config/winston')(module);
const sequelize = require('sequelize');

const schedule = require('node-schedule');
const KeyChange = require('../utils/KeyChange');

const stixInsert = require('./stixInsert');
const db = require('../models');

module.exports.searchAndInsert = async function() {
    schedule.scheduleJob('41 * * * * *', async function () {
        const bl_table = 'kdn_amly_H004_policy_bl';
        const connect_table = 'kdn_amly_H004_policy_connect';
        const ip_table = 'kdn_amly_H004_policy_ip';

        const black_white_list = 'black_white_list';
        const communi_white_list = 'communi_white_list';

        let rtnResult = {};
        try {

            const result = await db.sequelize.transaction(async (t) => {

                let rslt = db[bl_table.toUpperCase()].findAll({where: {trans_tag_bw: 'C'}}).then(users => {
                    if(users){
                        let childInfos = [];

                        for(user of users) {
                            let data = user.dataValues;
                            user.update({trans_tag_bw: 'E'});
                            let black = {type: 0, powerGenId: 'DS_001', unit: data.unit_id.substring(data.unit_id.length-1, data.unit_id.length), make: data.make_id.substring(data.make_id.length-3, data.make_id.length),
                                port: user.dataValues.port, ip: user.dataValues.ip, state: 'I'};
                            childInfos.push(black);
                        }
                        let results = {tableName: black_white_list, tableData: childInfos};
                        stixInsert.ParseandInsert(results);
                    }
                });

                if (rslt instanceof Error) {
                    throw new rslt;
                }
            })

            const result2 = await db.sequelize.transaction(async (t) => {

                let rslt = db[connect_table.toUpperCase()].findAll({where: {trans_tag_bw: 'C'}}).then(users => {
                    if(users){
                        let childInfos = [];

                        for(user of users) {
                            let data = user.dataValues;
                            user.update({trans_tag_bw: 'E'});
                            let connect = {stationId: 'DS', powerGenId: 'DS_001', unit: data.unit_id.substring(data.unit_id.length-1, data.unit_id.length), make: data.make_id.substring(data.make_id.length-3, data.make_id.length), protocolType: user.dataValues.protocol_type, detailProtocol:
                                user.dataValues.protocol_detail, srcIp: user.dataValues.src_ip, dstIp: user.dataValues.dst_ip, srcPort: user.dataValues.src_port, dstPort: user.dataValues.dst_port, state: 'I'};
                            childInfos.push(connect);
                        }
                        let results = {tableName: communi_white_list, tableData: childInfos};
                        stixInsert.ParseandInsert(results);
                    }
                });

                if (rslt instanceof Error) {
                    throw new rslt;
                }
            })

            const result3 = await db.sequelize.transaction(async (t) => {

                let rslt = db[ip_table.toUpperCase()].findAll({where: {trans_tag_bw: 'C'}}).then(users => {
                    if(users){
                        let childInfos = [];

                        for(user of users) {
                            let data = user.dataValues;
                            user.update({trans_tag_bw: 'E'});
                            let white = {type: 1, powerGenId: 'DS_001', unit: data.unit_id.substring(data.unit_id.length-1, data.unit_id.length), make: data.make_id.substring(data.make_id.length-3, data.make_id.length),
                                ip: data.ip, state: 'I'};
                            childInfos.push(white);
                        }
                        let results = {tableName: black_white_list, tableData: childInfos};
                        stixInsert.ParseandInsert(results);
                    }
                });

                if (rslt instanceof Error) {
                    throw new rslt;
                }
            })

        } catch (error) {
            // If the execution reaches this line, an error occurred.
            // The transaction has already been rolled back automatically by Sequelize!
            winston.error(error.stack);
            rtnResult = error;
        } finally {
            return rtnResult;
        }
    })
};