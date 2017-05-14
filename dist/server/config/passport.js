"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var user_model_1 = require("../models/user.model");
var local_1 = require("./strategies/local");
function setPassport() {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        user_model_1.default.findById(id, '-password -salt', function (err, user) {
            done(err, user);
        });
    });
    local_1.default();
}
exports.default = setPassport;
//# sourceMappingURL=passport.js.map