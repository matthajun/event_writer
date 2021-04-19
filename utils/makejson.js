const confirmutils = require('./confirmutils');
const rescodes = require('./rescodes');
const _ = require('loadsh');
const winston = require('../config/winston')(module);
const setDateTime = require('./setDateTime');
const getRequestId = require('./getRequestId');

module.exports.makeReqData = function (id){
    let reqData = {};
    let reqBody = {};

    const time = setDateTime.setDateTime();

    const reqHeaderData = {"message_id": id, "keeper_id": process.env.KEEPER_ID, "send_time": time};
    reqHeaderData.confirm_code = confirmutils.makeConfirmCode(JSON.stringify(reqBody));

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeReqData_H004 = function (id, policy_type){
    let reqData = {};
    let reqBody = {"policy_type": policy_type };

    const time = setDateTime.setDateTime();

    const reqHeaderData = {"message_id": id, "keeper_id": process.env.KEEPER_ID, "send_time": time};
    reqHeaderData.confirm_code = confirmutils.makeConfirmCode(JSON.stringify(reqBody));

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeReqData_H005_bl = function (obj, created_type){
    let reqData = {};

    const time = setDateTime.setDateTime();

    let Array = [];
    for (let o of obj.original){
        Array.push({ip: o.ip, port: o.port});
    }

    let reqHeaderData = {"message_id": 'H005', "keeper_id": process.env.KEEPER_ID, "send_time": time};

    const reqBody = {request_id: obj.request_id, unit_id: obj.unit_id, make_id: obj.make_id, created_type: created_type, policy_type: '3',
        policy_detail_type: 'single', policy_ip: [], policy_bl: Array, policy_connect: [], start_time: '', end_time: ''};

    reqHeaderData.confirm_code = confirmutils.makeConfirmCode(JSON.stringify(reqBody));

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeReqData_H005_wh = function (obj, created_type){
    let reqData = {};

    const time = setDateTime.setDateTime();

    let Array = [];
    for (let o of obj.original){
        Array.push({ip: o.ip});
    }

    let reqHeaderData = {"message_id": 'H005', "keeper_id": process.env.KEEPER_ID, "send_time": time};

    const reqBody = {request_id: obj.request_id, unit_id: obj.unit_id, make_id: obj.make_id, created_type: created_type, policy_type: '1',
        policy_detail_type: 'single', policy_ip: Array, policy_bl: [], policy_connect: [], start_time: '', end_time: ''};

    reqHeaderData.confirm_code = confirmutils.makeConfirmCode(JSON.stringify(reqBody));

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeReqData_H005_connect= function (obj, created_type){
    let reqData = {};

    const time = setDateTime.setDateTime();

    let Array = [];
    for (let o of obj.original){
        Array.push({...o});
    }

    let reqHeaderData = {"message_id": 'H005', "keeper_id": process.env.KEEPER_ID, "send_time": time};

    const reqBody = {request_id: obj.request_id, unit_id: obj.unit_id, make_id: obj.make_id, created_type: created_type, policy_type: '2',
        policy_detail_type: 'single', policy_ip: [], policy_bl: [], policy_connect: Array, start_time: '', end_time: ''};

    reqHeaderData.confirm_code = confirmutils.makeConfirmCode(JSON.stringify(reqBody));

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeReqData_H008 = function (id, body){
    let reqData = {};
    let reqBody = body;

    const time = setDateTime.setDateTime();

    const reqHeaderData = {"message_id": id, "keeper_id": process.env.KEEPER_ID, "send_time": time};
    reqHeaderData.confirm_code = confirmutils.makeConfirmCode(JSON.stringify(reqBody));

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeReqData_L001 = function (id, page){
    let reqData = {};

    const time = setDateTime.setDateTime();
    const before_time = String(Number(time) - 500);
    const reqHeaderData = {"message_id": id, "logger_id": ''};
    const reqBody = {"loged_start_time": before_time, "loged_end_time": time, 'page': page};

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeReqData_L002 = function (id){
    let reqData = {};
    let format_array = [];

    const reqHeaderData = {"message_id": id, "logger_id": ''};
    const reqBody = {"format_array": format_array};

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeReqData_L003 = function (id){
    let reqData = {};
    let plant_id_array = ["DS001"];
    let device_id_array = [];

    const reqHeaderData = {"message_id": id, "logger_id": ''};
    const reqBody = {"plant_id_array": plant_id_array, "device_id_array": device_id_array};

    reqData.header = reqHeaderData;
    reqData.body = reqBody;
    return reqData;
};

module.exports.makeResData = function (err, req){
    let resData={};
    let resBody={};
    const reqHeaderData = _.cloneDeep(req.body.header);
    if(!err){
        resBody = {"result":{"res_cd":"00","res_msg":"정상처리"}};
    }else{
        let errMessage;
        let errResult;
        try{
            errMessage = JSON.parse(err.message);
            if(errMessage.res_cd){
                errResult = errMessage;
            }else{
                errResult = {"res_cd":"99"};
            }
        }catch (e) {
            winston.error(err.stack, {e});
            errResult = {"res_cd":"99"};
        }

        resBody["result"] = errResult;
        resBody.result["res_msg"] = rescodes[resBody.result.res_cd];
    }
    if(req.body.header.message_id[0] !== 'L') {
        reqHeaderData.confirm_code = confirmutils.makeConfirmCode(JSON.stringify(resBody));
    }
    resData.header = reqHeaderData;
    resData.body = resBody;
    return resData;
};
