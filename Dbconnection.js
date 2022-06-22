var mysql = require('mysql');
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'khanhthu.kute2607',
    database: 'doanthuctap',
    multipleStatements: true
});
module.exports = connection;