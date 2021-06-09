const winston = require('../config/winston')(module);
const sequelize = require('sequelize');
const schedule = require('node-schedule');

const stixInsert = require('./stixInsert');
const db = require('../models');
const {QueryTypes} = require('sequelize');

module.exports.searchAndInsert = async function() {
    schedule.scheduleJob('24 * * * * *', async function () {
        const tableName = process.env.H002;
        const event_tableName = process.env.STIX_STATE;

        let rtnResult = {};
        try {
            const result = await db.sequelize.transaction(async (t) => {
                winston.info("************************* Query start ******************************");

                let rslt = await db.sequelize.query(
                    'SELECT \'State\' as flag, send_time as timeAgent, keeper_id as nameAgent, \'\' as idOrganizationAgent, ' +
                '\'\' as original, usageCPU, usageMemory, usageDisk from dti.kdn_amly_H002 where trans_tag_s = \'C\''
                    , {
                        type: QueryTypes.SELECT
                    }
                ).then(async users => {
                    if (users.length) {
                        let results = {tableName: event_tableName, tableData: users};

                        await stixInsert.ParseandInsert(results);
                        await db[tableName.toUpperCase()].update({trans_tag_s: 'E'},
                            {
                                where: {
                                    trans_tag_s: 'C'
                                }
                            });
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