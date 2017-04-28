# assignment_mad_lib_api
Serving up the madness with a Mad Lib API!

Designing the API

Now that you have your user CRUD handled let's begin designing the API. Before you start coding! Enter the design phase here. You should be able to think and plan out your API abstractly here without explicitly coding it in Express. Think high level. Review the concepts of RESTful API design we've covered. Ask yourself what your resources are and what actions you want to perform on them. Remember we want to enable the following features:

List Nouns
List Verbs
List Adverbs
List Adjectives
Create a Mad Lib from text (story) and a list of words
Your API should also allow the user (client) the ability to specify a number of each part of speech they'd like back in the response. So submitting a request without that parameter should default to say 10 words, but allow the user to specify a parameter to change the count of words returned.

router.get('/api/nouns', (req, res, next) => {
  const count = +req.query.count || 10;
  const nouns = [];
  for (let i = 0; i < count; i++) {
    nouns.push(wordpos.getNouns);
  }
  res.status(200).json(nouns));
})

ALL GET REQUESTS
/nouns
default: JSON [10 nouns]
/nouns?count=15
JSON [15 nouns]

/verbs

/adverbs

/adjectives

/madlib?text="something *noun* something *verb*"&words="stab,blue,horse"

User: /madlib/text="Viking code school makes me want to *verb* a *adjective* *noun*"&words="stab,blue,horse"
Server: {"data": "Viking code school makes me want to STAB a BLUE HOUSE"}
