import * as passport from 'passport';
import User from '../models/user.model';

export default class UsersController {

  login = (req, res, next) => {
    if (!req.user) {
      passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.status(401).send(info); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.send(user.toJSON());
        });
      })(req, res, next);
    } else {
      res.status(403).send();
    }
  };

  register = (req, res) => {
    if (!req.user) {
      const email = req.body.email;
      const password = req.body.password;
      if (!email) {
        return res.status(400).send({message: 'Email is required'});
      }
      if (!password) {
        return res.status(400).send({message: 'Password is required'});
      }
      User.findOne({email}, (err, user) => {
        if (err) return res.status(500).send(err);
        if (user) {
          return res.status(409).send({message: 'User already exists'});
        }

        const newUser = new User({email});
        newUser.setPassword(password);
        newUser.provider = 'local';
        newUser.save((err) => {
          if (err) return res.status(500).send(err);

          req.logIn(newUser, (err) => {
            if (err) return res.status(500).send(err);
            return res.send({id: newUser._id, email: newUser.email});
          })
        })
      });
    } else {
      return res.status(403).send();
    }
  };

  logout = (req, res) => {
    req.logout();
    return res.send();
  };

  isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(403).send({message: 'User is not logged in'});
    }
    next();
  }
}
