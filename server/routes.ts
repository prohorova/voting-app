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
    .post(usersController.isAuthenticated,
      pollsController.create
    );

  app.route('/api/polls/:id')
    .get(pollsController.get)
    .delete(pollsController.canDelete,
      pollsController.delete
    );

  app.route('/api/polls/vote/:pollId/')
    .post(pollsController.canVote,
      pollsController.vote
    );

}
