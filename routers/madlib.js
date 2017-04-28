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

router.post('/madlib', async (req, res) => {
  let words = req.body.words.join(" ");
  let text = req.body.text;

  let nouns = await wordpos.getNouns(words);
  let adjectives = await wordpos.getAdjectives(words);
  let verbs = await wordpos.getVerbs(words);
  let adverbs = await wordpos.getAdverbs(words);

  Sentencer.configure({
    // the list of nouns to use. Sentencer provides its own if you don't have one!
    nounList: nouns,

    // the list of adjectives to use. Again, Sentencer comes with one!
    adjectiveList: adjectives,
 
    actions: {
      verb : function() {
        let numVerbs = verbs.length;
        return verbs[Math.floor(Math.random() * numVerbs)];
      },
      adverb : function() {
        let numAdverbs = adverbs.length;
        return adverbs[Math.floor(Math.random() * numAdverbs)];
      }      
    }
  });

  let madlib = { data: Sentencer.make(text)};
  res.status(200).json(madlib);

});

module.exports = router;
