const httpcall = require('./httpCall');
const winston = require('../config/winston')(module);

module.exports.highrankPush = async function(value) {
    let options = {
        uri: process.env.BUMUN_ADDRESS,
        method: 'POST',
        body: value,
        json: true
    };

    await httpcall.httpReq(options, async function (err) {
        winston.info("*************************** "+value.tableName+" is transmitted*****************************");

        if (err instanceof Error) {
            throw new Error(err);
        }
    });
};