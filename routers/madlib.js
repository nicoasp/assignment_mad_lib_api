const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('./../models');
const User = mongoose.model('User');
const helpers = require('./../helpers');
const h = helpers.registered;
const Sentencer = require('sentencer');
const WordPOS = require('wordpos');
const wordpos = new WordPOS();

router.get('/nouns', (req, res) => {
  count = req.query.count || 10;
  wordpos.randNoun({ count }, result => {
    res.status(200).json(result);
  });
});

router.get('/adjectives', (req, res) => {
  count = req.query.count || 10;
  wordpos.randAdjective({ count }, result => {
    res.status(200).json(result);
  });
});

router.get('/adverbs', (req, res) => {
  count = req.query.count || 10;
  wordpos.randAdverb({ count }, result => {
    res.status(200).json(result);
  });
});

router.get('/verbs', (req, res) => {
  count = req.query.count || 10;
  wordpos.randVerb({ count }, result => {
    res.status(200).json(result);
  });
});

router.post('/madlib', (req, res) => {
  let words = req.body.words;
  let text = req.body.text;

  Sentencer.configure({
    // the list of nouns to use. Sentencer provides its own if you don't have one!
    nounList: [],

    // the list of adjectives to use. Again, Sentencer comes with one!
    adjectiveList: [],

    // additional actions for the template engine to use.
    // you can also redefine the preset actions here if you need to.
    // See the "Add your own actions" section below.
    actions: {
      my_action: function() {
        return 'something';
      }
    }
  });
});

module.exports = router;
