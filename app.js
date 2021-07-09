const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const makejson = require('./utils/makejson');
const initialize = require('./utils/Initial_table');
const winston = require('./config/winston')(module);
const v1 = require('./routes/v1');
const api = require('./routes/api');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

var app = express();
passportConfig();
app.set('port', process.env.PORT || 8002);

const H005 = require('./schedule/H005_schedule');
const H005_connect = require('./schedule/H005_connect_schedule');
const H008 = require('./schedule/H008_schedule');

const HighRank = require('./service/HighRank');

const stix_anomaly = require('./STIX_service/stixInsert_anomaly');
const stix_event = require('./STIX_service/stixInsert_event');
const stix_state = require('./STIX_service/stixInsert_state');
const stix_traffic = require('./STIX_service/stixInsert_traffic');

const H006 = require('./schedule/H006_schedule');
const H011 = require('./schedule/H011_schedule');
const H013 = require('./schedule/H013_schedule');
const H014 = require('./schedule/H014_schedule');

const white = require('./bw_service/H004_policy_ip');
const black = require('./bw_service/H004_policy_bl');
const communi = require('./bw_service/H004_policy_connect');

const H008_t = require('./schedule/H008_test');
const http = require('http');
const https = require('https');
const Transaction = require('./schedule/Transaction_schedule');
const H007_fail = require('./service/H007_FAIL');

sequelize.sync({ force: false })
    .then(() => {
        winston.info('success db connect ');
    })
    .catch((err) => {
        winston.error(err.stack);
    });

var protocol = 'https';

if (protocol === 'https') {
    var sslConfig = require('./config/ssl-config');
    var options = {
        key: sslConfig.privateKey,
        cert: sslConfig.certificate
    };
    server = https.createServer(options, app).listen(process.env.SSL_PORT);
} else {
    server = http.createServer(app);
}

app.use(morgan( process.env.NODE_ENV !== 'production'?'dev':'combined',{stream:winston.httpLogStream}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: false,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

// Other settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) { // 1
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
});

app.use('/v1', v1);
app.use('/api', api);
app.use('/auth', authRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    winston.error(err.stack);
    if(err.port === 8126 && err.address === (process.env.SECT_CH_ADDRESS).replace('http://','')){
        winston.error('****************** 부문 시스템과의 연결이 끊겼습니다. ******************');
        H007_fail.parseAndInsert(req);
    }
    res.json(makejson.makeResData(err,req))
});

app.set('etag', false);

H005.scheduleInsert();
H005_connect.scheduleInsert();
H008.scheduleInsert();
//H008_t.scheduleInsert();

HighRank.searchAndtransm();

initialize.Initialize(); //H004,H010 테이블 초기화

stix_anomaly.searchAndInsert();
stix_event.searchAndInsert();
stix_state.searchAndInsert();
stix_traffic.searchAndInsert();

H013.scheduleInsert();
H014.scheduleInsert();

H006.scheduleInsert();
H011.scheduleInsert();

white.searchAndInsert();
black.searchAndInsert();
communi.searchAndInsert();
Transaction.scheduleInsert();