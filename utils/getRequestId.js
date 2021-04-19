const setdatetime = require('./setDateTime');

//H005 RequestID 채번
module.exports.getRequestId = function () {
    const h005_prefix = 'H005';
    const time = setdatetime.setDateTime();

    let serialNumber = 1000 + Math.floor(Math.random() * 9000);

    return h005_prefix + time + String(serialNumber);
};