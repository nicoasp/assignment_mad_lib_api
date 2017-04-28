const app = require('../app');
const request = require('request');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const qs = require('qs');

describe('App', () => {
  const baseUrl = 'http://localhost:8888';
  const apiUrl = baseUrl + '/api/v1/';
  let server;
  let user;
  const apiUrlFor = (type, params) => {
    params = params ? `&${qs.stringify(params)}` : '';
    //Why do we have a & in front of the qs.stringfied params?
    return `${apiUrl}${type}?token=${user.token}${params}`;
  };
  const j = str => JSON.parse(str);

  beforeAll(done => {
    server = app.listen(8888, () => {
      done();
    });
  });

  beforeEach(done => {
    User.create({
      fname: 'Foo',
      lname: 'Bar',
      email: 'foobar@gmail',
      password: 'password'
    }).then(result => {
      user = result;
      done();
    });
  });

  afterAll(done => {
    server.close();
    server = null;
    done();
  });

  // ----------------------------------------
  // App
  // ----------------------------------------
  it('renders the home page', done => {
    request.get(baseUrl, (err, res, body) => {
      expect(res.statusCode).toBe(200);
      console.log(body);
      expect(body).toMatch(/api/i);
      done();
    });
  });

  it('returns an array of 10 nouns', done => {
    request.get(apiUrlFor('nouns'), (err, res, body) => {
      let nouns = j(body);
      console.log(nouns);
      expect(result.length).toEqual(10);
      done();
    });
  });
});
