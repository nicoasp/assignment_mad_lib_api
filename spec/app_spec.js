const app = require('../app');
const request = require('request');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const qs = require('qs');
const WordPOS = require('wordpos');
const wordpos = new WordPOS();

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
      expect(body).toMatch(/api/i);
      done();
    });
  });

  it('returns an array of 10 nouns', done => {
    request.get(apiUrlFor('nouns'), (err, res, body) => {
      let nouns = j(body);
      expect(nouns.length).toEqual(10);
      done(); 
    });
  });

  it('returns a given amount of nouns', done => {
    request.get(apiUrlFor('nouns', {count: 30}), (err, res, body) => {
      let nouns = j(body);
      expect(nouns.length).toEqual(30);
      done(); 
    });
  });
});
