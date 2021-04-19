const fs = require('fs');

module.exports.bodyToJsonFile = function (req ){
    //todo gloab_env file write path , file name
    try{
        const reqData = req.body;
        const filePath = process.env.FILE_WRITE_PATH;

        const ws = fs.createWriteStream(`${filePath}${reqData.header.message_id}__${reqData.header.send_time}.json`);
        ws.on('finish',() =>{
            console.log("finish file write");
        })
        ws.write(JSON.stringify(reqData.body));
        ws.end();
    }catch(e){
        throw new Error(e);
    }
}
