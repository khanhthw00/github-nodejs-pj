var express = require('express');
const cors = require('cors');

var sanpham = require('./routes/sanpham');
var loaisp = require('./routes/loaisanpham');
var taikhoan = require('./routes/taikhoan');
var congty = require('./routes/congty');
var trangthai = require('./routes/trangthai');
var phieunhap = require('./routes/phieunhap');
var ctpn = require('./routes/ctphieunhap');
var khachhang = require('./routes/khachhang');
var nhanvien = require('./routes/nhanvien');
var quyen = require('./routes/quyen');
var donhang = require('./routes/donhang');
var ctdh = require('./routes/ctdonhang');
var giohang = require('./routes/giohang');

// var connection = require('./Dbconnection');

var app = express();

// app.get('/', function (req, res) {
//     res.send('<h1>hello nodejs</h1>')
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use('/', sanpham);
app.use('/', loaisp);
app.use('/', taikhoan);
app.use('/', congty);
app.use('/', trangthai);
app.use('/', phieunhap);
app.use('/', ctpn);
app.use('/', khachhang);
app.use('/', nhanvien);
app.use('/', quyen);
app.use('/', donhang);
app.use('/', ctdh);
app.use('/', giohang);

const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function () {
    console.log('Server listening on port ' + server.address().port);
});
module.exports = app;