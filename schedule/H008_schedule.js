const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const H008 = require('../service/H008');
const makejson = require('../utils/makejson');
const db = require('../models');
const sequelize = require('sequelize');

let result = {};

exports.scheduleInsert = () => {
    schedule.scheduleJob('*/5 * * * *', function() {
        db.KDN_INFORM.findAll()
            .then(results => {
                for (result of results) {
                    let value = makejson.makeReqData_H008('H008', result.dataValues);
                    let options = {
                        uri: process.env.ANOMAL_ADDRESS,
                        method: 'POST',
                        body: value,
                        json: true
                    };

                    httpcall.httpReq(options, async function (err, res) {
                        result = await H008.parseAndInsert(res);

                        if (result instanceof Error) {
                            throw new Error(result);
                        }
                    });

                }
            })
            .catch(err => {
                console.error(err);
            });
    })
};