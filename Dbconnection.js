var mysql = require('mysql');
var connection = mysql.createPool({
    // host: 'localhost',

    // host: 'https://gear-api-project.herokuapp.com',
    // user: 'root',
    // password: 'khanhthu.kute2607',
    // database: 'doanthuctap',
    // address: "/Applications/MAMP/tmp/mysql/mysql.sock",
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'bffe6f234ab20c',
    password: '77ffa67e',
    database: 'heroku_b08a07c6ad90157',
    multipleStatements: true
});
module.exports = connection;