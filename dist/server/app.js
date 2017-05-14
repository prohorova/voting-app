"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var morgan = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var session = require("express-session");
var passport = require("passport");
var connectMongo = require("connect-mongo");
var config_1 = require("./config/config");
var passport_1 = require("./config/passport");
var routes_1 = require("./routes");
var app = express();
exports.app = app;
var MongoStore = connectMongo(session);
app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
mongoose.connect(config_1.default.db);
var db = mongoose.connection;
mongoose.Promise = global.Promise;
app.use(session({
    secret: config_1.default.sessionSecret,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: db })
}));
passport_1.default();
app.use(passport.initialize());
app.use(passport.session());
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
    routes_1.default(app);
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
    app.listen(app.get('port'), function () {
        console.log('Server listening on port ' + app.get('port'));
    });
});
//# sourceMappingURL=app.js.map