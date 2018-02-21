const db = require('./index.js').connection;

exports.verifyExistingUserLogin = (username, cb) => {
  db.query(`SELECT password FROM users WHERE username="${username}"`, (error, res) => {
    console.log(res, 'query res');
    if (error) cb(error);
    else cb(JSON.parse(JSON.stringify(res)));
  });
};

exports.addNewUserSignUp = (username, password, cb) => {
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, res) => {
    if (error) cb(error, 0);
    else cb(res, 1);
  });
};

// module.exports.verifyExistingUserLogin = verifyExistingUserLogin;
// module.exports.addNewUserLogin = addNewUserLogin;
