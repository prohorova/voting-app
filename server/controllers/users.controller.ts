import * as passport from 'passport';
import User from '../models/user.model';

export default class UsersController {

  login = (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.status(409).send(info); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send({_id: user._id, name: user.name, email: user.email});
      });
    })(req, res, next);
  };

  register = (req, res) => {
    const newUser = new User(req.body);
    if (newUser.password.length < 6) {
      return res.status(400).send({message: 'Password should be at least 6 characters long'})
    }
    User.findOne({email: newUser.email}, (err, user) => {
      if (err) return res.status(500).send(err);
      if (user) {
        return res.status(409).send({message: 'User with this email already exists'});
      }
      newUser.setPassword(newUser.password);
      newUser.save((err) => {
        if (err) return res.status(500).send(err);

        req.logIn(newUser, (err) => {
          if (err) return res.status(500).send(err);
          return res.send({_id: newUser._id, name: newUser.name, email: newUser.email});
        })
      })
    });
  };

  logout = (req, res) => {
    req.logout();
    return res.send({message: 'User is logged out'});
  };

  changePassword = (req, res) => {
    const userId = req.body.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    if (newPassword.length < 6) {
      return res.status(400)
        .send({message: 'New password should be at least 6 characters long'})
    }
    User.findById(userId, (err, user) => {
      if (err) return res.status(500).send({message: err.message});
      if (!user.validPassword(oldPassword)) {
        return res.status(409).send({message: 'Old password is incorrect'});
      }
      user.setPassword(newPassword);
      user.save((err) => {
        if (err) return res.status(500).send({message: err.message});
        return res.send({message: 'Password changed successfully'});
      })
    })
  };

  isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send({message: 'User is not logged in'});
    }
    next();
  }
}
