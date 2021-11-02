const moment = require('moment');

module.exports.setDateTime = function () {
    return moment().format("YYYYMMDDHHmmss");
};

module.exports.setDateTime_ago = function (mm) {
    let a = moment().subtract(mm,'minutes');
    return a.format('YYYYMMDDHHmm')
};

module.exports.changeFormat = function (time) {
    return moment(time).format('YYYYMMDDHHmm')
};

module.exports.setDateTimeforHistory = function () {
    return moment().format("YYYY.MM.DD, HH:mm:ss");
};

module.exports.setDateTime_dayago = function (mm) {
    let a = moment().subtract(mm,'days');
    return a.format('YYYYMMDDHHmm')
};

//트랜잭션 임의요청시에 사용하는 함수들 dayago3, dayago2
module.exports.setDateTime_dayago3 = function (mm) {
    let a = moment().subtract(mm,'days');
    return a.format('YYYYMMDD0000')
};

module.exports.setDateTime_dayago2 = function (mm) {
    let a = moment().subtract(mm,'days');
    return a.format('YYYYMMDD2359')
};

//피캡파일 삭제 날짜 추가 (2달전으로 날짜 설정)
module.exports.setDateTime_Pcap = function (mm) {
    let a = moment().subtract(mm, 'month');
    return a.format('YYYY-MM-DD')
};

module.exports.setDateTime_H009 = function (mm) {
    let a = moment().subtract(mm, 'month');
    return a.format('YYYYMMDDHHmmss')
};