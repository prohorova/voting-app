"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var crypto = require("crypto");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    email: { type: String,
        unique: true,
        required: 'Email is required',
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: 'Password is required',
        validate: [function (password) {
                return password && password.length > 6;
            }, 'Password should be at least 6 characters']
    },
    salt: String
});
UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
UserSchema.methods.validPassword = function (password) {
    var hashPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.password === hashPassword;
};
var User = mongoose.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map