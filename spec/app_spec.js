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
    request.get(apiUrlFor('nouns', { count: 30 }), (err, res, body) => {
      let nouns = j(body);
      expect(nouns.length).toEqual(30);
      done();
    });
  });

  it('returns an array of 10 adjectives', done => {
    request.get(apiUrlFor('adjectives'), (err, res, body) => {
      let adjectives = j(body);
      expect(adjectives.length).toEqual(10);
      done();
    });
  });

  it('returns a given amount of adjectives', done => {
    request.get(apiUrlFor('adjectives', { count: 14 }), (err, res, body) => {
      let adjectives = j(body);
      expect(adjectives.length).toEqual(14);
      done();
    });
  });

  it('returns an array of 10 adverbs', done => {
    request.get(apiUrlFor('adverbs'), (err, res, body) => {
      let adverbs = j(body);
      expect(adverbs.length).toEqual(10);
      done();
    });
  });

  it('returns a given amount of adverbs', done => {
    request.get(apiUrlFor('adverbs', { count: 19 }), (err, res, body) => {
      let adverbs = j(body);
      expect(adverbs.length).toEqual(19);
      done();
    });
  });

  it('returns an array of 10 verbs', done => {
    request.get(apiUrlFor('verbs'), (err, res, body) => {
      let verbs = j(body);
      expect(verbs.length).toEqual(10);
      done();
    });
  });

  it('returns a given amount of adverbs', done => {
    request.get(apiUrlFor('verbs', { count: 22 }), (err, res, body) => {
      let verbs = j(body);
      expect(verbs.length).toEqual(22);
      done();
    });
  });

  it('returns a string where {{noun}} is replaced with provided noun', done => {
    request.post(
      apiUrlFor('madlib'),
      { form: { text: 'This is a {{noun}}', words: ['cat'] } },
      (err, res, body) => {
        let madlib = j(body).data;
        console.log(madlib);
        expect(madlib).toEqual('This is a cat');
        done();
      }
    );
  });

  it('returns a string where {{adjective}} is replaced with provided adjective', done => {
    request.post(
      apiUrlFor('madlib'),
      { form: { text: 'This is a {{adjective}} cat', words: ['cute'] } },
      (err, res, body) => {
        let madlib = j(body).data;
        console.log(madlib);
        expect(madlib).toEqual('This is a cute cat');
        done();
      }
    );
  });

  it('returns a string where {{verb}} is replaced with provided verb', done => {
    request.post(
      apiUrlFor('madlib'),
      { form: { text: 'This cute cat likes to {{verb}}', words: ['cook'] } },
      (err, res, body) => {
        let madlib = j(body).data;
        console.log(madlib);
        expect(madlib).toEqual('This cute cat likes to cook');
        done();
      }
    );
  });

  it('returns a string where {{adverb}} is replaced with provided adverb', done => {
    request.post(
      apiUrlFor('madlib'),
      {
        form: {
          text: 'This cute cat likes to cook {{adverb}}',
          words: ['aggressively']
        }
      },
      (err, res, body) => {
        let madlib = j(body).data;
        console.log(madlib);
        expect(madlib).toEqual('This cute cat likes to cook aggressively');
        done();
      }
    );
  });

  it('returns a string where all parts of speech are replaced with given parts of speech', done => {
    request.post(
      apiUrlFor('madlib'),
      {
        form: {
          text: 'This {{adjective}} {{noun}} likes to {{verb}} {{adverb}}',
          words: ['aggressively', 'cute', 'cat', 'cook']
        }
      },
      (err, res, body) => {
        let madlib = j(body).data;
        console.log(madlib);
        expect(madlib).toEqual('This cute cat likes to cook aggressively');
        done();
      }
    );
  });

  it('returns an error where a text is provided without applicable correct words', done => {
    request.post(
      apiUrlFor('madlib'),
      {
        form: {
          text: 'This cute cat likes to cook {{adverb}}',
          words: ['bananas']
        }
      },
      (err, res, body) => {
        let madlib = j(body).data;
        console.log(madlib);
        expect(madlib).toEqual(
          'This cute cat likes to cook *No applicable adverbs provided!*'
        );
        done();
      }
    );
  });
});
