const httpcall = require('../utils/httpCall');
const H010 = require('../service/H010');
const makejson = require('../utils/makejson');

let result = {};

module.exports.ResInsert = async function(){
    let value = makejson.makeReqData('H010');
    let options = {
        uri: process.env.ANOMAL_ADDRESS,
        method: 'POST',
        body: value,
        json: true
    };

    httpcall.httpReq(options, async function(err, res) {
        result = await H010.parseAndInsert(res);

        if(result instanceof Error){
            throw new Error(result);
        }
    });

};