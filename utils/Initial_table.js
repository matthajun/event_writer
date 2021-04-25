const H004 = require('../schedule/H004_req');
const H010 = require('../schedule/H010_req');

const schedule = require('node-schedule');

module.exports.Initialize = function (){
    schedule.scheduleJob('*/2 * * * *', function() {
        H010.ResInsert();
        H004.ResInsert('1');
    });
};
