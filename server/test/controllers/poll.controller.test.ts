import * as chai from 'chai';
import * as chaiHttp from 'chai-http';

import { app } from '../../app';

import User from '../../models/user.model';
import Poll from '../../models/poll.model';

chai.use(chaiHttp);
const should = chai.should();

describe('Poll controller', () => {

  const userCredentials = {
    name: 'User',
    email: 'example@example.com',
    password: '123456789'
  };

  let user,
    poll;

  beforeEach(done => {
    user = new User({
      name: userCredentials.name,
      email: userCredentials.email
    });

    user.hashPassword(userCredentials.password);

    user.save(() => {
      poll = new Poll({
        name: 'Poll name',
        createdBy: user,
        options: [
          {value: 'option 1'},
          {value: 'option 2'}
        ]
      });

      poll.save(done);
    });
  });

  afterEach(done => {
    Poll.remove({}, () => {
      User.remove({}, done);
    })
  });

  describe('route /api/polls', () => {

    const newPollData = {
      name: 'New poll name',
      createdBy: user,
      options: [
        {value: 'option 1'},
        {value: 'option 2'}
      ]
    };

    it('should be able to retrieve all polls', done => {
      chai.request(app)
        .get('/api/polls')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.should.have.lengthOf(1);
          should.equal(poll.name, res.body[0].name);
          done();
        })
    });

    it('should not be able to create a new poll if not logged in', done => {
      chai.request(app)
        .post('/api/polls')
        .send(newPollData)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        })
    });

    it('should create new poll when logged in', done => {
      let cookie;
      const server = chai.request(app);
      server
        .post('/api/login')
        .send({
          email: userCredentials.email,
          password: userCredentials.password
        })
        .end((err, res) => {
          res.should.have.status(200);
          cookie = res.headers['set-cookie'];

          server
            .post('/api/polls')
            .set('cookie', cookie)
            .send(newPollData)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            })
        })
    });

  });

  describe('route /api/polls/:id', () => {
    it('should be able to get one poll', done => {
      chai.request(app)
        .get(`/api/polls/${poll._id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          should.equal(res.body.name, poll.name);
          done();
        })
    })
  });

  describe('route /api/polls/:id', () => {

    it('should not be able to delete a poll if not logged in', done => {
      chai.request(app)
        .delete(`/api/polls/${poll._id}`)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        })
    });

    it('should not be able to delete a poll created by another user', done => {
      const server = chai.request(app);

      const newUserCredentials = {
        name: 'New user',
        email: 'new@example.com',
        password: '123456789'
      };

      const user = new User(newUserCredentials);
      user.hashPassword(newUserCredentials.password);

      let cookie;

      user.save(() => {
        server
          .post('/api/login')
          .send({
            email: newUserCredentials.email,
            password: newUserCredentials.password
          })
          .end((err, res) => {
            res.should.have.status(200);
            cookie = res.headers['set-cookie'];

            server
              .delete(`/api/polls/${poll._id}`)
              .set('cookie', cookie)
              .end((err, res) => {
                res.should.have.status(403);
                done();
              })
          })
      })
    });

    it('should be able to delete a poll successfully', done => {
      const server = chai.request(app);

      let cookie;

      server
        .post('/api/login')
        .send({
          email: userCredentials.email,
          password: userCredentials.password
        })
        .end((err, res) => {
          res.should.have.status(200);
          cookie = res.headers['set-cookie'];

          server
            .delete(`/api/polls/${poll._id}`)
            .set('cookie', cookie)
            .end((err, res) => {
              res.should.have.status(200);

              Poll.find({}, (err, polls) => {
                polls.should.be.an('array');
                polls.should.have.lengthOf(0);
                done();
              });
            });
        });
    });
  });

  describe('route /api/polls/vote/:id', () => {

    it('should vote successfully for the existing option', done => {
      const pollId = poll._id;
      const optionId = poll.options[0]._id;
      chai.request(app)
        .post(`/api/polls/vote/${pollId}`)
        .send({id: optionId})
        .end((err, res) => {
          res.should.have.status(200);
          Poll.findById(pollId, (err, updatedPole) => {
            should.equal(updatedPole.options[0].votes, 1);
            done();
          });
        })
    });

    it('should not be able to create a new option if not logged in', done => {
      chai.request(app)
        .post(`/api/polls/vote/${poll._id}`)
        .send({value: 'option 3'})
        .end((err, res) => {
          res.should.have.status(403);
          done();
        })
    });

    it('should be able to create a new option if logged in', done => {
      const server = chai.request(app);

      let cookie;

      let newValue = 'option 3';

      server
        .post('/api/login')
        .send({
          email: userCredentials.email,
          password: userCredentials.password
        })
        .end((err, res) => {
          res.should.have.status(200);
          cookie = res.headers['set-cookie'];

          server
            .post(`/api/polls/vote/${poll._id}`)
            .send({value: newValue})
            .set('cookie', cookie)
            .end((err, res) => {
              res.should.have.status(200);
              Poll.findById(poll._id, (err, updatedPoll) => {
                updatedPoll.options.should.have.lengthOf(3);
                should.equal(updatedPoll.options[2].value, newValue);
                should.equal(updatedPoll.options[2].votes, 1);
                done();
              });
            })
        });
    });
  });
});
