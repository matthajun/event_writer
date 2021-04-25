const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const H008 = require('../service/H008');
const makejson = require('../utils/makejson');
const db = require('../models');
const sequelize = require('sequelize');
const setDateTime = require('../utils/setDateTime');

let result = {};

exports.scheduleInsert = () => {
    schedule.scheduleJob('*/5 * * * *', function() {
        const time = setDateTime.setDateTime();
        const before_time = setDateTime.setDateTime_ago_5();
        const long_before_time = setDateTime.setDateTime_ago_10();

        let body = {"unit_id":'EWP_01_UN_02', 'make_id': 'EWP_01_UN_02_ABB',
                    'start_time': long_before_time, 'end_time': before_time };

        let value = makejson.makeReqData_H008('H008',body);
        //console.log(11111111,value);
        httpcall.Call('post', process.env.ANOMAL_ADDRESS, value, async function (err, res) {
            //console.log(111111,res);
            result = await H008.parseAndInsert(res);

            if (result instanceof Error) {
                throw new Error(result);
            }
        });
    })
};
