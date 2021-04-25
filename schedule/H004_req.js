const httpcall = require('../utils/httpCall');
const H004 = require('../service/H004');
const makejson = require('../utils/makejson');

let result = {};

module.exports.ResInsert = async function(policy_type){
    let value = makejson.makeReqData_H004('H004', policy_type);
    //console.log(44444555,value);
    httpcall.Call('post', process.env.ANOMAL_ADDRESS, value, async function (err, res) {
        //console.log(44444444,res);
        result = await H004.parseAndInsert(res);

        if(result instanceof Error){
            throw new Error(result);
        }
    });
};