const appRoot = require('app-root-path');    // app root 경로를 가져오는 lib
const winston = require('winston');            // winston lib
const process = require('process');
const winstonDaily = require('winston-daily-rotate-file');
const path = require('path');
const mt = require('moment-timezone');
const moment = require('moment');
const date = mt().tz('Asia/Seoul');

const { combine, timestamp, label, printf  } = winston.format;
const logDir = process.env.NODE_ENV !== 'production' ? `${appRoot}${path.sep}logs${path.sep}`: '/data/ds/logs/';

const getLabel = function (callingModule) {
    const parts = callingModule.filename.split(path.sep);
    return parts[parts.length - 2] + path.sep + parts.pop();
};

const myFormat = printf(({ level, message, label, timestamp ,stack}) => {
    return `${timestamp} [${label}] ${level}: ${message}`;    // log 출력 포맷 정의
});

const appendTimestamp = winston.format((info, opts) => {
    if(opts.tz)
        info.timestamp = moment().tz(opts.tz).format('YYYY-MM-DD, HH:mm:ss');
    return info;
});

const myCustomLevels = {
    levels: {
        view: 0,
        error: 1,
        info: 3,
        debug: 4
    }
};

const logger = function (callingModule) {

    let logger = new winston.createLogger({
        levels: myCustomLevels.levels,
        transports: [
            new winstonDaily({
                level: 'debug',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir,
                filename: `%DATE%.log`,
                maxFiles: 30,  // 30일치 로그 파일 저장
                zippedArchive: true,
                format: combine(
                    label({ label: getLabel(callingModule)}),
                    timestamp(),
                    myFormat
                )
            }),
            // error 레벨 로그를 저장할 파일 설정
            new winstonDaily({
                level: 'error',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장
                filename: `%DATE%.error.log`,
                maxFiles: 60,
                zippedArchive: true,
                format: combine(
                    label({ label: getLabel(callingModule)}),
                    timestamp(),
                    myFormat
                )
            }),
            new winstonDaily({
                level: 'view',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir + '/view',  // error.log 파일은 /logs/error 하위에 저장
                filename: `%DATE%.view.log`,
                maxFiles: 60,
                zippedArchive: true,
                json: true,
                format: combine(
                    appendTimestamp({ tz: 'Asia/Seoul'}),
                    printf(info => {
                        return `${info.timestamp} : \n ${JSON.stringify(info.message, null, 2)}`;
                    })
                )
            })
        ],
        exitOnError: false,
    });

    const httpLogger = winston.createLogger({ // NOTE: http status 로그를 남기기 위함.
        levels: myCustomLevels.levels,
        format: combine(
            label({ label: 'http' }),
            timestamp(),
            myFormat,
        ),
        transports: [
            new winstonDaily({
                level: 'info',
                datePattern: 'YYYY-MM-DD',
                dirname: logDir,
                filename: `%DATE%.log`,
                maxFiles: 30,  // 30일치 로그 파일 저장
                zippedArchive: true,
                format: combine(
                    label({ label: 'http'}),
                    timestamp(),
                    myFormat
                )
            })
        ],
    });

    if(process.env.NODE_ENV !== 'production'){
        logger.add(
            new winston.createLogger({
                levels: myCustomLevels.levels,
                transports: [
                    new winston.transports.Console({
                        level:'debug',
                        json: false,
                        timestamp: true,
                        depth:true,
                        colorize:true,
                        format: combine(
                            label({ label: getLabel(callingModule)}),
                            timestamp(),
                            myFormat
                        )
                    })
                ]
            })
        );
        httpLogger.add(
            new winston.createLogger({
                levels: myCustomLevels.levels,
                transports: [
                    new winston.transports.Console({
                        json: false,
                        timestamp: true,
                        depth:true,
                        colorize:true,
                        format: combine(
                            label({ label: 'http'}),
                            timestamp(),
                            myFormat
                        )
                    })
                ]
            })
        );
    }

    logger.httpLogStream = {
        write: (message) => { // NOTE: morgan에서 쓰기 위해 이 형태로 fix 되야함.
            httpLogger.log({
                level: 'info',
                message: message,
            });
        },
    };

    return logger;
};

module.exports = logger;