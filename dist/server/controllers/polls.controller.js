"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var poll_model_1 = require("../models/poll.model");
var PollsController = (function () {
    function PollsController() {
        this.create = function (req, res) {
            var poll = new poll_model_1.default(req.body);
            poll.createdBy = req.user;
            poll.save(function (err) {
                if (err)
                    return res.status(500).send(err);
                res.send(poll);
            });
        };
        this.canVote = function (req, res, next) {
            if (req.user) {
                var alreadyVoted = req.poll.users.some((function (user) {
                    return user.equals(req.user.id);
                }));
                if (alreadyVoted) {
                    return res.status(403).send({ message: 'You already voted' });
                }
                return next();
            }
            else {
                return next();
            }
        };
        this.canDelete = function (req, res, next) {
            if (!req.poll.createdBy.equals(req.user._id)) {
                return res.status(403).send({ message: 'User is not authorized' });
            }
            return next();
        };
        this.get = function (req, res) {
            res.send(req.poll);
        };
        this.delete = function (req, res) {
            req.poll.remove(function (err) {
                if (err)
                    return res.status(500).send(err);
                return res.send({});
            });
        };
        this.list = function (req, res) {
            poll_model_1.default.find({}).populate('createdBy', 'name').exec(function (err, polls) {
                if (err)
                    return res.status(500).send(err);
                res.send(polls);
            });
        };
        this.vote = function (req, res) {
            var option = req.body, poll = req.poll;
            if (option.id) {
                var optionToVote = poll.options.id(option.id);
                optionToVote.votes++;
            }
            else {
                poll.options.push({ value: option.value, votes: 1 });
            }
            if (req.user) {
                poll.users.push(req.user._id);
            }
            poll.save(function (err) {
                if (err)
                    return res.status(500).send(err);
                return res.send(poll);
            });
        };
    }
    PollsController.prototype.getPoll = function (req, res, next) {
        poll_model_1.default.findById(req.params.id).exec(function (err, poll) {
            if (err)
                return res.status(500).send(err);
            if (!poll)
                return res.status(500).send({ message: 'Poll doesn\'t exist' });
            req.poll = poll;
            return next();
        });
    };
    return PollsController;
}());
exports.default = PollsController;
//# sourceMappingURL=polls.controller.js.map