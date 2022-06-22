var express = require('express');
var router = express.Router();
const ErrorResponse = require('../Models/ErrorResponse');
const { response, route } = require('../server');

let conn = require('../Dbconnection.js');

//loaisanpham
router.get('/loaisanpham', function (req, res) {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    conn.query("SELECT * FROM loaisp ORDER BY IDLOAI ASC", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

router.get('/loaisanpham/:id', function (req, res, next) {
    let id = req.params.id;
    if (id) {
        query_string = "SELECT * FROM loaisp WHERE IDLOAI=" + id;
        conn.query(query_string, function (err, result, fields) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(result);
            }
        });
    }
    else {
        conn.query("SELECT * FROM loaisp", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }
});

// router.post('/loaisanpham', function (req, res, next) {
//     var {TENLOAI} = req.body;
//     conn.query(`INSERT INTO loaisp (TENLOAI) VALUES (${conn.escape(TENLOAI)})`, function(err, result) {
//         if(err) 
//             {
//                 res.json({status: 500});
//                 //return next(new ErrorResponse(500, `Wrong action`));
//             }
//             if(result.lenght > 0) {
//                 console.log("added");
//                 res.json({status: 200});
//             }
//             else {
//                 return next(new ErrorResponse(404, `Không tồn tại loại sản phẩm`));
//             }
//     }); 
// });

router.post('/loaisanpham', function(req, res, next) {
    var {TENLOAI} = req.body;
    conn.query(`SELECT TENLOAI FROM loaisp WHERE TENLOAI = ${conn.escape(TENLOAI)}`, function (err, result, fields) {
        if (err) throw err;
        var [tt] = result;
        if(tt){ 
            res.json({status: 500});
            return next(new ErrorResponse(500, `Wrong action`));
        }else{ 
            var sql = `INSERT INTO loaisp (TENLOAI) VALUES (${conn.escape(TENLOAI)})`
        }
        conn.query(sql, function(err, result) {
            if(err) throw err;
            res.json({status: 200});
        });
    });
    
});

router.put('/loaisanpham/:id', function(req,res,next) {
    let id = req.params.id;
    var {TENLOAI} = req.body;
    conn.query('UPDATE loaisp SET TENLOAI=?  WHERE IDLOAI=?', [TENLOAI, id], function(err, result) {
        if(err) 
        {
            res.json({status: 500});
            return next(new ErrorResponse(500, `Wrong action`));
        }
        else if(result.affectedRows > 0) {
            res.json({status: 200});
        }
        else {
            return next(new ErrorResponse(404, `Không tồn tại sản phẩm`));
        }
    });
});

router.delete('/loaisanpham/:id', function (req, res, next) {
    let id = req.params.id;
    if(id) {
        query_string = "DELETE FROM loaisp WHERE IDLOAI =" + id;
        conn.query(query_string, function (err, result) {
            if(err) 
            {
                res.json({status: 500});
                return next(new ErrorResponse(500, err.sqlMessage));
            }
            if(result.affectedRows > 0) {
                console.log("Deleted");
                res.json({status: 200});
            }
            else {
                return next(new ErrorResponse(404, `Không tồn tại loại sản phẩm`));
            }
        }); 
    }
});

module.exports = router;