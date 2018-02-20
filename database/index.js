const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'root',
  password: '',
  // database: 'jobsearch'
});

connection.connect((err) => {
  if(err) {console.log(err)}

  console.log('Database connected')
})

module.exports = connection;
