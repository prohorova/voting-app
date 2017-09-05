import Poll from '../models/poll.model';

export default class PollsController {

  create = (req, res) => {
    let poll = new Poll(req.body);

    poll.createdBy = req.user;
    poll.save((err) => {
      if (err) return res.status(500).send(err);
      res.send(poll);
    })
  };

  canVote = (req, res, next) => {
    const { id, value} = req.body;

    if (value && !req.isAuthenticated()) {
      return res.status(403).send({message: 'User is not authorized'});
    }

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let userVoted;
    let ipVoted;

    userVoted = req.user && req.poll.users.some(user => {
      return user.equals(req.user.id);
    });

    ipVoted = req.poll.ips.indexOf(ip) !== -1;

    if (userVoted || ipVoted) {
      return res.status(403).send({message: 'You already voted'});
    }
    return next();
  };

  canDelete = (req, res, next) => {
    if (!req.poll.createdBy.equals(req.user._id)) {
      return res.status(403).send({message: 'User is not authorized'})
    }
    return next();
  };

  getPoll(req, res, next) {
    Poll.findById(req.params.id).exec((err, poll) => {
      if (err) return res.status(500).send(err);
      if (!poll) return res.status(500).send({message: 'Poll doesn\'t exist'});
      req.poll = poll;
      return next();
    })
  }

  get = (req, res) => {
    res.send(req.poll);
  };

  delete = (req, res) => {
    req.poll.remove((err) => {
      if (err) return res.status(500).send(err);
      return res.send({});
    })
  };

  list = (req, res) => {
    Poll.find({}).limit(parseInt(req.query.limit || 100)).populate('createdBy', 'name').exec((err, polls) => {
      if (err) return res.status(500).send(err);
      res.send(polls);
    })
  };

  vote = (req, res) => {
    const { id, value} = req.body,
      poll = req.poll;
    if (id) {
      const optionToVote = poll.options.id(id);
      optionToVote.votes++;
    } else {
      poll.options.push({value, votes: 1});
    }
    if (req.user) {
      poll.users.push(req.user._id);
    }
    poll.ips.push(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    poll.save((err) => {
      if (err) return res.status(500).send(err);
      return res.send(poll);
    })
  };
}
