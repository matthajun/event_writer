const winston = require('../config/winston')(module);
const _ = require('loadsh');
const sequelize = require('sequelize');
const db = require('../models');
const setDateTime = require('../utils/setDateTime');

let tablePrefix = process.env.ANOMALY_TABLE_PREFIX;
let masterTableName = "";

const CH_H015 = require('../clickhouse/H015');
const CH_H015_sect = require('../clickhouse/H015_sect');

module.exports.parseAndInsert = async function(req){
    let seq_array = [];
    
    if(req.body.body.send_type === '1') {
        masterTableName = tablePrefix + req.body.header.message_id;
    }
    else if (req.body.body.send_type === '2') {
        masterTableName = 'kdn_amly_H007';
        winston.info(JSON.stringify(req.body));
        await CH_H015.parseAndInsert(req);
        await CH_H015_sect.parseAndInsert(req);
    }

    const time = setDateTime.setDateTime();
    const reqBodyData = {...req.body.body};
    const tableInfos = [];

    for (const [key,value] of Object.entries(reqBodyData)){
        if(Array.isArray(value)){
            let childTableInfos = [];
            for(let rowData of value){
                childTableInfos.push( {...rowData , ...req.body.header, date_time: time, request_id: req.body.body.request_id});
            }
            tableInfos.push({tableName:masterTableName ,tableData:childTableInfos});
        }
    }

    let rtnResult = {};
    try {

        const result = await db.sequelize.transaction(async (t) => {
            winston.info("********************************************************************************");
            winston.info("*******************query start *************************");
            for(const tableInfo of tableInfos){
                winston.debug(JSON.stringify(tableInfo));
                if(!Array.isArray(tableInfo.tableData)){
                    let rslt = await db[tableInfo.tableName.toUpperCase()].create(tableInfo.tableData,{ transaction: t });
                    //rlst =  new Error("임의 발생");
                    if(rslt instanceof Error){
                        throw new rslt;
                    }
                }else{
                    for(const chileTableData of tableInfo.tableData){
                        seq_array.push(chileTableData.anomaly_seq);
                    }
                }
            }
            winston.info("********************************************************************************");
            winston.info("*******************query end *************************");
        });

    } catch (error) {
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!
        winston.error(error.stack);
        rtnResult =  error;
    } finally {
        if(rtnResult instanceof Error) {
            return rtnResult;
        }
        else {
            return seq_array;
        }
    }
};