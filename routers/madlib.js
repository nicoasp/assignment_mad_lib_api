const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const models = require('./../models');
const User = mongoose.model('User');
const helpers = require('./../helpers');
const h = helpers.registered;
const Sentencer = require('sentencer');
const WordPOS = require('wordpos');

router.get('/nouns', (req, res) => {
  //new instance of sentencer, use sentencer.make to create list of 10 nouns unless count is passed
});
