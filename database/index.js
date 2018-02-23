const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'greenfield.c0l03qd09k76.us-east-2.rds.amazonaws.com',
  user: 'Fletcher',
  password: 'TeamFletcher1',
  database: 'GreenField',
});

connection.connect((err) => {
  if (err) {
    console.log(`error connecting: ${err}`);
  } else {
    console.log(`connected as id ${connection.threadId}`);
  }
});

// connection.query('SELECT * FROM users', (error, rows) => {
//   if (error) console.log('ERROR in connection.query: ', error);
//   else console.log('these are the results: ', JSON.parse(JSON.stringify(rows)));
// });

module.exports.connection = connection;
