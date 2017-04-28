const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const User = require('../models/user');
const j = str => {
  return JSON.parse(str);
};

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const expressHandlebars = require('express-handlebars');

var hbs = expressHandlebars.create({
  partialsDir: 'views/',
  defaultLayout: 'application'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('madlib');
});

app.post('/', async (req, res) => {
  let text = req.body.text;
  let words = req.body.words.trim();
  // let user = await User.find({ email: 'foobar@gmail.com' });
  let token = '72bbe575b96e251bbde09e5702becfa5';
  words = words.split(', ');
  request.post(
    'http://localhost:3000/api/v1/madlib',
    {
      form: { text, words, token }
    },
    (err, madRes, body) => {
      console.log(body);
      let result = j(body).data;
      res.render('madlib', { result });
    }
  );
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
