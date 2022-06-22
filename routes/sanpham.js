var express = require('express');
var router = express.Router();
const ErrorResponse = require('../Models/ErrorResponse');
const { response, route } = require('../server');

let conn = require('../Dbconnection.js');

//sanpham
router.get('/sanpham', function (req, res) {
    conn.query("SELECT sanpham.*, loaisp.* FROM sanpham, loaisp WHERE sanpham.IDLOAI = loaisp.IDLOAI ORDER BY sanpham.IDSP DESC", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

//sanpham moi nhat
router.get('/sanphammoi', function (req, res) {
    conn.query("SELECT * FROM sanpham ORDER BY sanpham.IDSP DESC LIMIT 4 ", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

router.get('/spbanchay', function (req, res) {
    conn.query("SELECT SUM(ctdonhang.SOLUONG) as total, sanpham.TENSP, sanpham.TIEUDE, sanpham.URLSP, sanpham.GIA, sanpham.IDLOAI FROM ctdonhang, sanpham WHERE sanpham.IDSP=ctdonhang.IDSP AND IDDH in (SELECT IDDH FROM donhang WHERE donhang.IDTRANGTHAI=1 AND datediff(NOW(), donhang.NGAYGIAODICH) < 30) GROUP BY ctdonhang.IDSP ORDER BY total DESC LIMIT 4", function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
});

router.get('/sanpham/:id', function (req, res, next) {
    let id = req.params.id;
    if (id) {
        query_string = "SELECT * FROM sanpham where IDSP=" + id;
        conn.query(query_string, function (err, result, fields) {
            if (err) throw err;
            var [sp]= result;
                res.json(sp);
        });
    }
    else {
        conn.query("SELECT * FROM sanpham", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }
});


router.get('/sanpham-theoloai/:id', function (req, res, next) {
    let id = req.params.id;
    if (id) {
        query_string = "SELECT sanpham.TENSP, sanpham.GIA, sanpham.TIEUDE, sanpham.URLSP, sanpham.IDLOAI, sanpham.IDSP, sanpham.SOLUONG FROM sanpham, loaisp where sanpham.IDLOAI = loaisp.IDLOAI AND loaisp.IDLOAI=" + id;
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
        conn.query("SELECT * FROM sanpham", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }
});


router.post('/sanpham', function(req, res, next) {
    var {TENSP,SOLUONG,GIA,GIAKM,MOTA,TIEUDE,URLSP,IDLOAI} = req.body;
    conn.query(`SELECT TENSP FROM sanpham WHERE TENSP = ${conn.escape(TENSP)}`, function (err, result, fields) {
        if (err) throw err;
        var [tt] = result;
        if(tt){ 
            res.json({status: 500});
            return next(new ErrorResponse(500, `Wrong action`));
        }else{ 
            var sql = `INSERT INTO sanpham (TENSP,SOLUONG,GIA,GIAKM,MOTA,TIEUDE,URLSP,IDLOAI) 
                             VALUES (${conn.escape(TENSP)}, ${conn.escape(SOLUONG)}, ${conn.escape(GIA)}, 0, ${conn.escape(MOTA)}, ${conn.escape(TIEUDE)}, ${conn.escape(URLSP)}, ${conn.escape(IDLOAI)})`
        }
        conn.query(sql, function(err, result) {
            if(err) throw err;
            res.json({status: 200});
        });
    });
    
});

router.put('/sanpham/:id', function(req,res, next) {
    let id = req.params.id;
    var {TENSP,SOLUONG,GIA,GIAKM,MOTA,TIEUDE,URLSP,IDLOAI} = req.body;
    conn.query('UPDATE sanpham SET TENSP=?, SOLUONG=?, GIA=?, GIAKM=?, MOTA=?, TIEUDE=?, URLSP=?, IDLOAI=? WHERE IDSP=?', 
                [TENSP,SOLUONG,GIA,0,MOTA,TIEUDE,URLSP,IDLOAI,id], function(err,result) {
                    if(err) 
                    {
                        res.json({status: 400});
                    }
                    if(result) {
                        console.log("Updated");
                        res.json({status: 200});
                    }
                    else {
                        return next(new ErrorResponse(404, `Không tồn tại sản phẩm`));
                    }
                });
});

router.delete('/sanpham/:id', function(req, res, next) {
   let id = req.params.id;
   if(!id.trim())
   {
       return next(new ErrorResponse(400, "không có ID sản phẩm"));
   }
    conn.query('DELETE  FROM sanpham WHERE IDSP=' + id, function(err,result) {
        if(err) 
        {
            return next(new ErrorResponse(500, err.sqlMessage));
        }
        if(result.affectedRows > 0) {
            console.log("Deleted");
            res.json({status: 200});
        }
        else {
            return next(new ErrorResponse(404, `Không tồn tại sản phẩm`));
        }
    });
});

// router.post('/sanpham', function (req, res, next) {
//     var {TENSP,SOLUONG,GIA,GIAKM,MOTA,TIEUDE,URLSP,IDLOAI} = req.body;
//     conn.query(`INSERT INTO sanpham (TENSP,SOLUONG,GIA,GIAKM,MOTA,TIEUDE,URLSP,IDLOAI) 
//                 VALUES (${conn.escape(TENSP)}, ${conn.escape(SOLUONG)}, ${conn.escape(GIA)}, ${conn.escape(GIAKM)}, ${conn.escape(MOTA)}, ${conn.escape(TIEUDE)}, ${conn.escape(URLSP)}, ${conn.escape(IDLOAI)})`, function(err, result) {
//                     if(err) 
//                     {
//                         return next(new ErrorResponse(400, `Wrong action`));
//                     }
//                     if(result.affectedRows > 0) {
//                         console.log("Updated");
//                         res.json({status: 200});
//                     }
//                     else {
//                         return next(new ErrorResponse(404, `Không tồn tại sản phẩm`));
//                     }
//                     res.json({status: 200});
//                 });
// });

module.exports = router;