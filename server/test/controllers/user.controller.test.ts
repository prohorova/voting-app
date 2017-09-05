import * as chai from 'chai';
import * as chaiHttp from 'chai-http';
const should = chai.use(chaiHttp).should();

import { app } from '../../app';

import User from '../../models/user.model';

describe('User controller', () => {

  const validUserCredentials = {
    name: 'name',
    email: 'example@example.com',
    password: '123456789'
  };

  let user;

  beforeEach(done => {
    user = new User({name: validUserCredentials.name, email: validUserCredentials.email});
    user.hashPassword(validUserCredentials.password);
    user.save(done);
  });

  afterEach(done => {
    User.remove({}, done);
  });

  describe('should test route /api/login', () => {

    it('should not login user if no email provided', done => {
      chai.request(app)
        .post('/api/login')
        .send({password: validUserCredentials.password})
        .end((err, res) => {
          res.should.have.status(400);
          should.equal(res.body.message, 'Email is required');
          done();
        })
    });

    it('should not login user if no password provided', done => {
      chai.request(app)
        .post('/api/login')
        .send({email: 'example@example.com'})
        .end((err, res) => {
          res.should.have.status(400);
          should.equal(res.body.message, 'Password is required');
          done();
        })
    });

    it('should login valid user', done => {
      chai.request(app)
        .post('/api/login')
        .send( {email: validUserCredentials.email, password: validUserCredentials.password})
        .end((err, res) => {
          res.should.have.status(200);
          should.equal(res.body._id, user._id.toString());
          should.equal(res.body.name, user.name);
          should.equal(res.body.email, user.email);
          done();
        })
    });

    it('should not login user with invalid email', done => {
      chai.request(app)
        .post('/api/login')
        .send( {email: 'invalid@example.com', password: validUserCredentials.password})
        .end((err, res) => {
          res.should.have.status(400);
          should.equal(res.body.message, 'User doesn\'t exist');
          done();
        })
    });

    it('should not login user with invalid password', done => {
      chai.request(app)
        .post('/api/login')
        .send( {email: validUserCredentials.email, password: 'invalid_password'})
        .end((err, res) => {
          res.should.have.status(400);
          should.equal(res.body.message, 'Password is incorrect');
          done();
        })
    })
  });

  describe('should test route /api/register', () => {

    it('should not register user if no name provided', done => {
      chai.request(app)
        .post('/api/register')
        .send({email: validUserCredentials.email, password: validUserCredentials.password})
        .end((err, res) => {
          res.should.have.status(400);
          should.equal(res.body.message, 'Name is required');
          done();
        })
    });

    it('should not register user if no email provided', done => {
      chai.request(app)
        .post('/api/register')
        .send({name: validUserCredentials.name, password: validUserCredentials.password})
        .end((err, res) => {
          res.should.have.status(400);
          should.equal(res.body.message, 'Email is required');
          done();
        })
    });

    it('should not register user if no password provided', done => {
      chai.request(app)
        .post('/api/register')
        .send({name: validUserCredentials.name, email: validUserCredentials.email})
        .end((err, res) => {
          res.should.have.status(400);
          should.equal(res.body.message, 'Password is required');
          done();
        })
    });

    it('should not register user if it already exists', done => {
      chai.request(app)
        .post('/api/register')
        .send(validUserCredentials)
        .end((err, res) => {
          res.should.have.status(400);
          should.equal(res.body.message, 'User with this email already exists');
          done();
        })
    });

    it('should register new user successfully', done => {
      const newUserCredentials = {
        name: 'User2',
        email: 'new@example.com',
        password: '123456789'
      };

      chai.request(app)
        .post('/api/register')
        .send(newUserCredentials)
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body._id);
          should.equal(res.body.name, newUserCredentials.name);
          should.equal(res.body.email, newUserCredentials.email);
          done();
        })
    });

  });

  describe('should test route /api/logout', () => {

    it('should logout user', done => {
      chai.request(app)
        .get('/api/logout')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        })
    })
  });

});
