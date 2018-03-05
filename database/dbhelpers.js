const db = require('./index.js').connection;

// at login, verify an existing user by retrieving the saved password in the database
exports.verifyExistingUserLogin = (username, cb) => {
  db.query(`SELECT password FROM users WHERE username="${username}"`, (error, res) => {
    if (error) cb(error);
    else cb(JSON.parse(JSON.stringify(res)));
  });
};

// at signup, add a new user by inputting username and password; username is set as unique,
// trying to save a username already existed will induce cb(error, 0) where obj.allow = 0
exports.addNewUserSignUp = (username, password, cb) => {
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (error, res) => {
    if (error) cb(error, 0);
    else cb(res, 1);
  });
};

// save a user's favorite listings into database including the following parameters
exports.saveFavs = (price, address, image, transit, driving, hLatLong, userName, cb) => {
  const { lat, lng } = hLatLong;
  const queryString = 'INSERT INTO favorites (price, address, image, transit, driving, lat, lng, user_ID) VALUES (?, ?, ?, ?, ?, ?, ?, (SELECT id FROM users WHERE username = ?))';
  db.query(queryString, [price, address, image, transit, driving, lat, lng, userName], (error, res) => {
    if (error) cb(error);
    else cb(res);
  });
};

// delete a user's favorite listing when address and username match the listing
exports.deleteFavs = (address, userName, cb) => {
  const queryString = 'DELETE FROM favorites WHERE address = ? and user_ID = (SELECT id FROM users WHERE username = ? limit 1)';
  db.query(queryString, [address, userName], (error, res) => {
    if (error) cb(error);
    else cb(res);
  });
};

// get a user's favorite listings from the database
exports.getFavs = (userName, cb) => {
  const queryString = 'SELECT * FROM favorites WHERE user_ID = (SELECT id FROM users WHERE username = ?)';
  db.query(queryString, [userName], (error, res) => {
    console.log('checking for faves on list render, res: ', JSON.parse(JSON.stringify(res)));
    cb(JSON.parse(JSON.stringify(res)));
  });
};

// get the addresses from a specific user's favorite listings
exports.checkFavs = (userName, cb) => {
  const queryString = 'SELECT address FROM favorites WHERE user_ID = (SELECT id FROM users WHERE username = ?)';
  db.query(queryString, [userName], (error, res) => {
    console.log('checking for faves on list render, res: ', JSON.parse(JSON.stringify(res)));
    cb(JSON.parse(JSON.stringify(res)));
  });
};
