const winston = require('../config/winston')(module);
const sequelize = require('sequelize');

const schedule = require('node-schedule');
const KeyChange = require('../utils/KeyChange');

const stixInsert = require('./stixInsert');
const db = require('../models');

module.exports.searchAndInsert = async function() {
    schedule.scheduleJob('7 * * * * *', async function () {
        const tableName = process.env.H012;
        const event_tableName = process.env.STIX_TRAFFIC;

        let rtnResult = {};
        try {

            const result = await db.sequelize.transaction(async (t) => {
                winston.info("********************************************************************************");
                winston.info("*******************query start *************************");

                let rslt = db[tableName.toUpperCase()].findAll({where: {trans_tag_t: 'C'}}).then(users => {
                    if(users){
                        let childInfos = [];

                        for(user of users) {
                            user.update({trans_tag_t: 'E'});
                            childInfos.push(user.dataValues);
                        }
                        let results = {tableName: event_tableName, tableData: childInfos};
                        KeyChange.KeyChange_traffic(results);
                        stixInsert.ParseandInsert(results);
                    }
                });

                if (rslt instanceof Error) {
                    throw new rslt;
                }
                winston.info("********************************************************************************");
                winston.info("*******************query end *************************");
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