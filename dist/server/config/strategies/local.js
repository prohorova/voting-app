"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passportLocal = require("passport-local");
var user_model_1 = require("../../models/user.model");
var LocalStrategy = passportLocal.Strategy;
function addLocalStrategy() {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (username, password, done) {
        user_model_1.default.findOne({ email: username }, function (err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, { message: 'User doesn\'t exist' });
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Password is incorrect' });
            }
            return done(null, user);
        });
    }));
}
exports.default = addLocalStrategy;
//# sourceMappingURL=local.js.map