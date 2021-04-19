const dotenv = require('dotenv');
dotenv.config();

const H004 = require('../schedule/H004_req');
const H010 = require('../schedule/H010_req');

module.exports.Initialize = function (){
    H010.ResInsert();
    H004.ResInsert(10);
};
