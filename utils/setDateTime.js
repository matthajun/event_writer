const moment = require('moment');

module.exports.setDateTime = function () {
    return moment().format("YYYYMMDDHHmmss");
};

module.exports.setDateTime_ago_5 = function () {
    let a = moment().subtract(5,'minutes');
    return a.format('YYYYMMDDHHmm')
};

module.exports.setDateTime_ago_10 = function () {
    let a = moment().subtract(10,'minutes');
    return a.format('YYYYMMDDHHmm')
};
