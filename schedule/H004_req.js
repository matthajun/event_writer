const httpcall = require('../utils/httpCall');
const H004 = require('../service/H004');
const makejson = require('../utils/makejson');

let result = {};

module.exports.ResInsert = async function(policy_type){
    let value = makejson.makeReqData_H004('H004', policy_type);
    let options = {
        uri: process.env.ANOMAL_ADDRESS,
        method: 'POST',
        body: value,
        json: true
    };

    httpcall.httpReq(options, async function(err, res) {
        result = await H004.parseAndInsert(res);

        if(result instanceof Error){
            throw new Error(result);
        }
    });
};