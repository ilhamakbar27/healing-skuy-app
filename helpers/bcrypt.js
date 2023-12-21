const { hashSync } = require("bcryptjs");

function hashing(password) {
  const salt = 10;
  return hashSync(password, salt);
}



module.exports = hashing;
