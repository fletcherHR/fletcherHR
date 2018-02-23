const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.RDS_HOSTNAME || 'greenfield.c0l03qd09k76.us-east-2.rds.amazonaws.com',
  user: process.env.RDS_USERNAME || 'Fletcher',
  password: process.env.RDS_PASSWORD || 'TeamFletcher1',
  port: process.env.RDS_PORT || 3306,
  database: process.env.RDS_DB_NAME || 'GreenField',
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
