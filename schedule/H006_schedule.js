const schedule = require('node-schedule');
const db = require('../models');
const sequelize = require('sequelize');

const H004 = require('../schedule/H004_req');
const winston = require('../config/winston')(module);

module.exports.scheduleInsert = () => {
    schedule.scheduleJob(process.env.H006_TIME, async function() {
        let rtnResult = {};

        try {
            const result = await db.sequelize.transaction(async (t) => {
                let tableName = process.env.H006;

                let rslt = await db[tableName.toUpperCase()].findAll({where: {state: 'C'}}).then(users => {
                    if (users.length) {
                        winston.info("******************* H006 Alarm is found!!! *************************");
                        for (user of users) {
                            let policy_type = user.dataValues.policy_type;
                            H004.ResInsert(policy_type);
                            user.update({state: 'E'});
                        }
                    }
                });
            });

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