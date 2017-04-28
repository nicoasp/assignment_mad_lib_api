const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const j = str => {
  return JSON.parse(str);
};
const token = require('./token');

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

app.post('/', (req, res) => {
  let text = req.body.text;
  let words = req.body.words.trim();
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
