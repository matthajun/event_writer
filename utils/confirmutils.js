const CRC32 = require('crc-32');
const fs = require('fs');


//const str = "\"body\":{\"result\":{\"res_cd\":\"00\",\"res_msg\":\"정상처리\"}}";
/*
const str = '"body":{"result":{"res_cd":"93","res_msg":"정합성 코드 불일치"}}';
console.log(CRC32.str(str).toString(16));*/

/*
const path = 'C:\\Users\\stella\\Desktop\\test0416\\H004.json';
const data = [];
const rs  = fs.createReadStream(path);
rs.on('data',(chunk) =>{
    data.push(chunk);
});
rs.on('end' , ()=>{
    const js_data = JSON.parse(data.toString());
    const confirm_code = js_data.header.confirm_code;
    console.log(js_data.header);
    console.log(confirm_code);
    console.log(JSON.stringify(js_data.body));
    console.log(CRC32.str('"body":'+ JSON.stringify(js_data.body)).toString(16));
    console.log(confirm_code == CRC32.str('"body":'+ JSON.stringify(js_data.body)).toString(16));
    //console.log(makeConfirmCode(JSON.stringify(js_data.body)));

});*/
module.exports.makeConfirmCode  = function (strData){
    return CRC32.str('"body":' + strData).toString(16);
};
