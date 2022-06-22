var express = require('express');
var router = express.Router();
// const ErrorResponse = require('../Models/ErrorResponse');
const { response, route } = require('../server');

let conn = require('../Dbconnection.js');

router.post('/quyen', function (req, res) {
    var {TENQUYEN} = req.body;
    conn.query(`INSERT INTO quyen (TENQUYEN) VALUES (${conn.escape(TENQUYEN)})`, function(err, result) {
        if (err) throw err;
        console.log("Created");
        res.json({status: 200});
    }); 
});

module.exports = router;