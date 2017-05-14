import Poll from '../models/poll.model';

export default class PollsController {

  list = (req, res) => {
    Poll.find({}).populate('createdBy', 'name').exec((err, polls) => {
      if (err) return res.status(500).send(err);
      res.send(polls);
    })
  };

  get = (req, res) => {
    Poll.findById(req.params.id).exec((err, poll) => {
      if (err) return res.status(500).send(err);
      if (!poll) return res.status(500).send({message: 'Poll doesn\'t exist'});
      res.send(poll);
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
      return res.send({});
    })
  };

  vote = (req, res) => {
    const option = req.body;
    Poll.findById(req.params.pollId, (err, poll) => {
      if (err) return res.status(500).send(err);
      if (option.id) {
        const optionToVote = poll.options.id(option.id);
        optionToVote.votes++;
      } else {
        poll.options.push({value: option.value, votes: 1});
      }
      if (req.user) {
        poll.users.push(req.user.id);
      }
      poll.save((err) => {
        if (err) return res.status(500).send(err);
        return res.send(poll);
      })
    })
  };

  canVote = (req, res, next) => {
    if (req.user) {
      Poll.findById(req.params.pollId, (err, poll) => {
        if (err) return res.status(500).send(err);
        const alreadyVoted = poll.users.some((user => {
          return user.equals(req.user.id);
        }));
        if (alreadyVoted) {
          return res.status(403).send({message: 'You already voted'});
        }
        return next();
      });
    } else {
      return next();
    }
  };

  canDelete = (req, res, next) => {
    Poll.findById(req.params.id).exec((err, poll) => {
      if (err) return res.status(500).send(err);
      if (!poll.createdBy.equals(req.user._id)) {
        return res.status(403).send({message: 'User is not authorized'})
      }
      req.poll = poll;
      return next();
    });
  }
}
