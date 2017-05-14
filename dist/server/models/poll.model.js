"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var OptionSchema = new Schema({
    value: { type: String, required: true },
    votes: { type: Number, default: 0 }
});
var PollSchema = new Schema({
    name: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    options: [OptionSchema],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }] // users who voted in this poll
});
var Poll = mongoose.model('Poll', PollSchema);
exports.default = Poll;
//# sourceMappingURL=poll.model.js.map