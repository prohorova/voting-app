import PollsController from './controllers/polls.controller';
import UsersController from "./controllers/users.controller";

export default function setRoutes(app) {

  const pollsController = new PollsController();
  const usersController = new UsersController();

  // auth
  app.route('/api/login')
    .post(usersController.login);

  app.route('/api/register')
    .post(usersController.register);

  app.route('/api/logout')
    .get(usersController.logout);

  app.route('/api/change-password')
    .post(
      usersController.isAuthenticated,
      usersController.changePassword
    );

  // pollsList
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
