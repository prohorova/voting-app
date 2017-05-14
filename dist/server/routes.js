"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var polls_controller_1 = require("./controllers/polls.controller");
var users_controller_1 = require("./controllers/users.controller");
function setRoutes(app) {
    var pollsController = new polls_controller_1.default();
    var usersController = new users_controller_1.default();
    // auth
    app.route('/api/login')
        .post(usersController.login);
    app.route('/api/register')
        .post(usersController.register);
    app.route('/api/logout')
        .get(usersController.logout);
    app.route('/api/change-password')
        .post(usersController.isAuthenticated, usersController.changePassword);
    // pollsList
    app.route('/api/polls')
        .get(pollsController.list)
        .post(usersController.isAuthenticated, pollsController.create);
    app.route('/api/polls/:id')
        .get(pollsController.getPoll, pollsController.get)
        .delete(usersController.isAuthenticated, pollsController.getPoll, pollsController.canDelete, pollsController.delete);
    app.route('/api/polls/vote/:id/')
        .post(pollsController.getPoll, pollsController.canVote, pollsController.vote);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map