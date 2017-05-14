"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var user_model_1 = require("../models/user.model");
var UsersController = (function () {
    function UsersController() {
        this.login = function (req, res, next) {
            passport.authenticate('local', function (err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(409).send(info);
                }
                req.logIn(user, function (err) {
                    if (err) {
                        return next(err);
                    }
                    return res.send({ _id: user._id, name: user.name, email: user.email });
                });
            })(req, res, next);
        };
        this.register = function (req, res) {
            var name = req.body.name;
            var email = req.body.email;
            var password = req.body.password;
            user_model_1.default.findOne({ email: email }, function (err, user) {
                if (err)
                    return res.status(500).send(err);
                if (user) {
                    return res.status(409).send({ message: 'User with this email already exists' });
                }
                var newUser = new user_model_1.default({ name: name, email: email });
                newUser.setPassword(password);
                newUser.provider = 'local';
                newUser.save(function (err) {
                    if (err)
                        return res.status(500).send(err);
                    req.logIn(newUser, function (err) {
                        if (err)
                            return res.status(500).send(err);
                        return res.send({ _id: newUser._id, name: newUser.name, email: newUser.email });
                    });
                });
            });
        };
        this.logout = function (req, res) {
            req.logout();
            return res.send({ message: 'User is logged out' });
        };
        this.changePassword = function (req, res) {
            var userId = req.body.userId;
            var oldPassword = req.body.oldPassword;
            var newPassword = req.body.newPassword;
            user_model_1.default.findById(userId, function (err, user) {
                if (err)
                    return res.status(500).send({ message: err.message });
                if (!user.validPassword(oldPassword)) {
                    return res.status(409).send({ message: 'Old password is incorrect' });
                }
                user.setPassword(newPassword);
                user.save(function (err) {
                    if (err)
                        return res.status(500).send({ message: err.message });
                    return res.send({ message: 'Password changed successfully' });
                });
            });
        };
        this.isAuthenticated = function (req, res, next) {
            if (!req.isAuthenticated()) {
                return res.status(401).send({ message: 'User is not logged in' });
            }
            next();
        };
    }
    return UsersController;
}());
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map