var mysql = require('mysql');
var connection = mysql.createPool({
    // host: 'localhost',

    host: 'https://gear-api-project.herokuapp.com',
    user: 'root',
    password: 'khanhthu.kute2607',
    database: 'doanthuctap',
    // address: "/Applications/MAMP/tmp/mysql/mysql.sock",
    multipleStatements: true
});
module.exports = connection;