const winston = require('../config/winston')(module);
const sequelize = require('sequelize');
const db = require('../models');
const makereq = require('../utils/makerequest');
const schedule = require('node-schedule');
const _ = require('loadsh');

module.exports.searchAndtransm = async function() {
    schedule.scheduleJob('49 * * * * *', async function() {
        let rtnResult = {};
        try {
            const tableNames = process.env.TABLE_NAMES.split(',');

            for (tableName of tableNames) {
                const result = await db.sequelize.transaction(async (t) => {
                    let tableInfo = {};

                    winston.info("********************************************************************************");
                    winston.info("*******************query start *************************");
                    let rslt = await db[tableName.toUpperCase()].findAll({where: {trans_tag: 'C'}}).then(users => {
                        if (users) {
                            let childTable = [];
                            for (user of users) {
                                user.update({trans_tag: 'E'});
                                childTable.push(user.dataValues);
                            }
                            tableInfo = {tableName: tableName, tableData: _.cloneDeep(childTable)};
                            makereq.highrankPush(tableInfo);
                        }
                    });
                    winston.info("********************************************************************************");
                    winston.info("*******************query end *************************");
                });
            }
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
