import Poll from '../models/poll.model';

export default class PollsController {

  list = (req, res) => {
    Poll.find({}, (err, polls) => {
      if (err) return res.status(500).send(err);
      res.send(polls);
    })
  };

  create = (req, res) => {
    let poll = new Poll(req.body);
    poll.createdBy = req.user;
    poll.save((err) => {
      if (err) return res.status(500).send(err);
      res.send(poll);
    })
  };

  delete = (req, res) => {
    req.poll.remove((err) => {
      if (err) return res.status(500).send(err);
      res.send(200);
    })
  };

  vote = (req, res) => {
    Poll.find({id: req.params.pollId}, (err, poll) => {
      if (err) return res.status(500).send(err);
      const option = poll.options.id(req.params.optionId);
      option.votes++;
      poll.save((err) => {
        if (err) return res.status(500).send(err);
        return res.send();
      })
    })
  };

  canVote = (req, res, next) => {
    if (req.user) {
      Poll.find({id: req.params.pollId}, (err, poll) => {
        if (err) return res.status(500).send(err);
        if (req.user.id in poll.users) {
          return res.status(403).send({message: 'You already voted'});
        }
        return next();
      });
    } else {
      return next();
    }
  };

  hasRights = (req, res, next) => {
    Poll.find({id: req.params.id}, function(err, poll) {
      if (err) return res.status(500).send(err);
      if (poll.createdBy !== req.user.id) {
        res.status(403).send({message: 'User is not authorized'})
      }
      req.poll = poll;
      next();
    })
  }
}
