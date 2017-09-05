import PollsController from './controllers/polls.controller';
import UsersController from "./controllers/users.controller";

export default function setRoutes(app) {

  const pollsController = new PollsController();
  const usersController = new UsersController();

  // auth
  app.post('/api/login', usersController.login);

  app.post('/api/register', usersController.register);

  app.get('/api/logout', usersController.logout);

  app.post('/api/change-password', usersController.isAuthenticated, usersController.changePassword);

  // polls

  app.route('/api/polls')
    .get(pollsController.list)

    .post(
      usersController.isAuthenticated,
      pollsController.create
    );

  app.route('/api/polls/:id')
    .get(pollsController.getPoll, pollsController.get)

    .delete(
      usersController.isAuthenticated,
      pollsController.getPoll,
      pollsController.canDelete,
      pollsController.delete
    );

  app.route('/api/polls/vote/:id/')
    .post(
      pollsController.getPoll,
      pollsController.canVote,
      pollsController.vote
    );

}
