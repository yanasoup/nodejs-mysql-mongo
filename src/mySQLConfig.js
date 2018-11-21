const mysql = require('mysql');
var mySQLConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'upoint2'
});


module.exports.mySQLConn = mySQLConn;
/*mySQLConn.connect();
 
mySQLConn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
mySQLConn.end();*/