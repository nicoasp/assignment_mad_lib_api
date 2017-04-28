const User = require('../models/user');

module.exports = User.find({ email: 'foobar@gmail.com' });
