const db = require('./index.js').connection;

exports.verifyExistingUserLogin = (username, cb) => {
  db.query(`SELECT password FROM users WHERE username="${username}"`, (error, res) => {
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

exports.saveFavs = (address, price, commuteTime, aptImageURL, userName, cb) => {
  const queryString = 'INSERT INTO favorites (address, price, commuteTime, aptImageURL, user_ID) VALUES (?, ?, ?, ?, (SELECT id FROM users WHERE username = ? limit 1))';
  db.query(queryString, [address, price, commuteTime, aptImageURL, userName], (error, res) => {
    if (error) cb(error);
    else cb(res);
  });
};

exports.deleteFavs = (address, userName, cb) => {
  const queryString = 'DELETE FROM favorites WHERE address = ? and user_ID = (SELECT id FROM users WHERE username = ? limit 1)';
  db.query(queryString, [address, userName], (error, res) => {
    if (error) cb(error);
    else cb(res);
  });
};

exports.checkFavs = (userName, cb) => {
  // checkFavs of user by address and userID
  const queryString = 'SELECT address FROM favorites WHERE user_ID = (SELECT id FROM users WHERE username = ?)';
  db.query(queryString, [userName], (error, res) => {
    console.log('these are the results: ', JSON.parse(JSON.stringify(res)));
    // results is an array of objects with key address: saved favorite address, tied to the favorites of the user
    // what do to with these results?
    // we want to check
    cb(JSON.parse(JSON.stringify(res)));
  });
};
