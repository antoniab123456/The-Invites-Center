const User = require('../models/user');

exports.verifyUser = (email, callback) => {
  const query = {email: email};
	User.findOne(query, callback);
}
