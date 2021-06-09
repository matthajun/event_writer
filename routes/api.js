const express = require('express');
const router = express.Router();
const confirmutils = require('../utils/confirmutils');
const makejson = require('../utils/makejson');
const winston = require('../config/winston')(module);

const time = require('../utils/setDateTime');

const H001 = require('../service/H001');
const H002 = require('../service/H002');
const H003 = require('../service/H003');
const H011 = require('../service/H011');

const H004 = require('../schedule/H004_req');
const H004_te = require('../service/H004');
const H009 = require('../service/H009');
const H010 = require('../schedule/H010_req');
const H010_te = require('../service/H010');
const H012 = require('../service/H012');
const H015 = require('../service/H015');

const CH_H007 = require('../clickhouse/H007');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.DOWNLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const uploader = multer({storage: storage});

router.post('/v1', async (req, res, next) => {
    try {
        winston.debug("post id " + req.body.header.message_id);
        const codeId = req.body.header.message_id;

        //confirm_code check 실행
        const reqData = req.body;
        const reqConfirmCode = reqData.header.confirm_code;
        const localMakeConfirmCode = await confirmutils.makeConfirmCode(reqData.body);

        if (reqConfirmCode !== localMakeConfirmCode) {
            winston.error(`우리쪽 값 ${localMakeConfirmCode} ,  받은 값 ${reqConfirmCode}`);
            const errCode = "93";
            throw Error(`{"res_cd":"${errCode}"}`);
        }


        let result =  {};
        let ch_result = {};
        switch (codeId) {
            case "H001" :
                result = await  H001.parseAndInsert(req);
                break;
            case "H002" :
                result = await  H002.parseAndInsert(req);
                break;
            case "H003" :
                result = await  H003.parseAndInsert(req);
                break;
            case "H004" :
                result = await  H004_te.parseAndInsert(req);
                break;

            case "H006" :
                result = await  H001.parseAndInsert(req);
                //res.json(makejson.makeResData(null,req));
                //H004.ResInsert(req.body.body.policy_type);
                break;

            case "H007" :
                winston.info(JSON.stringify(req.body));
                result = await  H001.parseAndInsert(req);
                ch_result = await CH_H007.parseAndInsert(req);
                break;

            case "H009" :
                result = await  H001.parseAndInsert(req);
                break;

            case "H010" :
                result = await H010_te.parseAndInsert(req);
                break;

            case "H011" :
                result = await  H011.parseAndInsert(req);
                //res.json(makejson.makeResData(null,req));
                //H010.ResInsert();
                break;

            case 'H012' :
                result = await H012.parseAndInsert(req);
                break;

            case 'H015' :
                result = await H015.parseAndInsert(req);
                break;

            default:
                throw Error(`{"res_cd":"99"}`);
        }

        if(result instanceof Error){ //Insert가 안되었을때
            throw new Error(result);
        }else if(ch_result instanceof Error){
            throw new Error(ch_result);
        }
        else{
            res.json(makejson.makeResData(null,req));
        }

    } catch (err) {
        next(err);
    }
});

router.post('/v1/:id', uploader.single('pcap_file'), async (req, res, next)=> {
   try {
        winston.debug("post id " + req.params.id);
        const codeId = req.params.id;

        let result = {};
        let reqData = {};
        const pcap_res = {"body":{"header":{"message_id":"H009","keeper_id":"EWP_01_01"}}};

        switch (codeId) {
            case "pcap" :
                winston.info(req.body.json_data);
                reqData = JSON.parse(req.body.json_data);

                const reqConfirmCode = reqData.header.confirm_code;
                const localMakeConfirmCode = await confirmutils.makeConfirmCode(reqData.body);

                if (reqConfirmCode !== localMakeConfirmCode) {
                    winston.error(`${localMakeConfirmCode} ,  ${reqConfirmCode}`);
                    const errCode = "93";
                    throw Error(`{"res_cd":"${errCode}"}`);
                }
                //이상없으면 H009테이블로 인서트
                winston.info('******************** H009 인서트 시작! *********************');
                result = await H009.parseAndInsert(reqData);
                winston.info('******************** pcap 파일'+reqData.body.file_name+'을 수신하여 저장합니다. file is downloading.********************');
                break;

            default:
                throw Error(`{"res_cd":"99"}`)
        }

        if(result instanceof Error){
            winston.info('**************** pcap 수신 에러 발생! ***************');
            throw new Error(result);
        }else {
            res.json(makejson.makeResData(null, pcap_res));
            winston.info('************* 파일 응답을 보냈습니다.************   ');
        }

   } catch(err) {
       next(err);
   }
});

module.exports = router;
