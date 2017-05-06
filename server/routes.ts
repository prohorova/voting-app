import PollsController from './controllers/polls.controller';
import UsersController from "./controllers/users.controller";

export default function setRoutes(app) {

  const pollsController = new PollsController();
  const usersController = new UsersController();

  // auth
  app.route('/api/login').post(usersController.login);
  app.route('/api/register').post(usersController.register);
  app.route('/api/logout').get(usersController.logout);

  // polls
  app.route('/api/polls')
    .get(pollsController.list)
    .post(usersController.isAuthenticated, pollsController.create);

  app.route('/api/polls/:id')
    .delete(usersController.isAuthenticated,
      pollsController.hasRights,
      pollsController.delete
    );

  app.route('/api/:pollId/:optionId')
    .get(pollsController.canVote,
      pollsController.vote
    );

}
