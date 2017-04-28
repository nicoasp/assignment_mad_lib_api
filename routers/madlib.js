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
  wordpos.randNoun({ count }, (result) => {
  	res.status(200).json(result);
  })
});



module.exports = router;