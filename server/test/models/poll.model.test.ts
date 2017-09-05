import * as chai from 'chai';
const should = chai.should();

import User from '../../models/user.model';
import Poll from '../../models/poll.model';

describe('Poll model:', () => {

  let user;
  let poll;

  let userCredentials = {
    name: 'Name',
    email: 'example@example.com',
    password: '123456789'
  };

  beforeEach(done => {
    user = new User({name: userCredentials.name, email: userCredentials.email});
    user.hashPassword(userCredentials.password);
    user.save(() => {
      poll = new Poll({
        name: 'Poll name',
        createdBy: user,
        options: [
          { value: 'option 1' },
          { value: 'option 2' }
        ]
      });
      done();
    });
  });

  afterEach(done => {
    User.remove({}, () => {
      Poll.remove({}, done);
    });
  });

  it('should not save poll without name', done => {
    poll.name = '';
    poll.save(err => {
      should.exist(err);
      done();
    })
  });

  it('should not save poll without createdBy', done => {
    poll.createdBy = '';
    poll.save(err => {
      should.exist(err);
      done();
    })
  });

  it('should not save poll without options', done => {
    poll.options = null;
    poll.save(err => {
      should.exist(err);
      done();
    })
  });

  it('should not save poll when there are less than 2 options', done => {
    poll.options = [{ value: 'option 1', votes: 0}];
    poll.save(err => {
      should.exist(err);
      done();
    })
  });

  it('should save poll without problems', done => {
    poll.save(err => {
      should.not.exist(err);
      done();
    })
  });

});
