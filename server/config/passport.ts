import * as passport from 'passport';
import User from '../models/user.model';

import addLocalStrategy from './strategies/local';

export default function setPassport() {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, '-password -salt', function(err, user) {
      done(err, user);
    })
  });

  addLocalStrategy();

}
