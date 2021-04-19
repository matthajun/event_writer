const winston = require('../config/winston')(module);
const sequelize = require('sequelize');

const schedule = require('node-schedule');
const KeyChange = require('../utils/KeyChange');

const stixInsert = require('./stixInsert');
const db = require('../models');
const {QueryTypes} = require('sequelize');

module.exports.searchAndInsert = async function() {
    schedule.scheduleJob('15 * * * * *', async function () {
        const tableName = process.env.H002;
        const event_tableName = process.env.STIX_STATE;

        let rtnResult = {};
        try {

            const result = await db.sequelize.transaction(async (t) => {
                winston.info("********************************************************************************");
                winston.info("*******************query start *************************");

                let rslt = await db.sequelize.query(
                    'select * from kdn_amly_H002 ' +
                    'where trans_tag_s = \'C\' '
                    , {
                        type: QueryTypes.SELECT
                    }
                ).then(async users => {
                    if (users) {
                        let results = {tableName: event_tableName, tableData: users};
                        KeyChange.KeyChange_state(results);
                        stixInsert.ParseandInsert(results);
                        let rt = await db[tableName.toUpperCase()].update({trans_tag_s: 'E'},
                            {
                                where: {
                                    trans_tag_s: 'C'
                                }
                            });
                        if (rt instanceof Error) {
                            throw new rt;
                        }
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