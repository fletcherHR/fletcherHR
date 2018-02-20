const db = require('./index.js');

const verifyExistingUserLogin = (username, cb) => {
  db.query(`SELECT password FROM users WHERE username="${username}"`, (error, res) => {
    if (error) console.log('ERROR in verifyExistingUser, error: ', error);
    else cb(JSON.parse(JSON.stringify(res)));
  });
};

const addNewUserLogin = (username, password, cb) => {
  db.query('INSERT INTO users (username, password) VALUES ("?", "?")', [username, password], (error, res) => {
    if (error) console.log('ERROR in addNewUserLogin: ', error);
    else cb(res);
  });
};

module.exports.verifyExistingUserLogin = verifyExistingUserLogin;
module.exports.addNewUserLogin = addNewUserLogin;
