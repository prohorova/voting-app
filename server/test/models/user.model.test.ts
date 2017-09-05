import * as chai from 'chai';
const should = chai.should();

import User from '../../models/user.model';

describe('User model:', () => {

  const name = 'User';
  const email = 'example@example.com';
  const password = '123456qwe';

  let user;

  beforeEach(() => {
    user = new User({name, email});
    user.hashPassword(password);
  });

  afterEach(done => {
    User.remove({}, done);
  });

  it('should set hashed password', () => {
    should.not.equal(password, user.password);
  });

  it('should check password validity', () => {
    should.equal(user.validPassword(password), true);
  });

  it('should not save user without name', done => {
    user.name = '';
    user.save(err => {
      should.exist(err);
      done();
    })
  });

  it('should not save user without email', done => {
    user.email = '';
    user.save(err => {
      should.exist(err);
      done();
    })
  });

  it('should not save user without password', done => {
    user.password = '';
    user.save(err => {
      should.exist(err);
      done();
    })
  });

  it('should not save user with invalid email', done => {
    user.email = 'email';
    user.save(err => {
      should.exist(err);
      done();
    })
  });

  it('should save user', done => {
    user.save(err => {
      should.not.exist(err);
      done();
    })
  });
});
