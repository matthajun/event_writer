const schedule = require('node-schedule');
const httpcall = require('../utils/httpCall');
const H008 = require('../service/H008');
const makejson = require('../utils/makejson');
const db = require('../models');
const sequelize = require('sequelize');
const setDateTime = require('../utils/setDateTime');
const winston = require('../config/winston')(module);
const _ = require('loadsh');

module.exports.scheduleInsert = () => {
    schedule.scheduleJob("2 */2 * * * *", function() {
        const before_time = setDateTime.setDateTime_ago(2);
        const long_before_time = setDateTime.setDateTime_ago(3);

        let body = {"unit_id":'EWP_01_UN_02', 'make_id': 'EWP_01_UN_02_ABB',
            'start_time': long_before_time, 'end_time': before_time };

        let value = makejson.makeReqData_H008forTest('H008',body);
        winston.debug(JSON.stringify(value));

        httpcall.Call('post', process.env.ANOMAL_ADDRESS, value, function (err, res) {
            winston.info("******************* ABB 요청 **********************");

            res.body.result.contents = JSON.stringify(value.body);
            H008.parseAndInsert(res);
        });

        let body2 = {"unit_id":'EWP_01_UN_02', 'make_id': 'EWP_01_UN_02_GE_GT',
            'start_time': long_before_time, 'end_time': before_time };

        let value2 = makejson.makeReqData_H008forTest('H008',body2);
        winston.debug(JSON.stringify(value2));

        setTimeout(function(){
            httpcall.Call('post', process.env.ANOMAL_ADDRESS, value2, function (err, res) {
                winston.info("******************* GE 요청 **********************");

                res.body.result.contents = JSON.stringify(value2.body);
                H008.parseAndInsert(res);
            });
        }, 1000);

    })
};