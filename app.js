const path = require('path') //系统路径模块
const express = require('express')
const fs = require('fs') //文件模块
var bodyParser = require('body-parser'); //对post请求的请求体进行解析模块
const app = express()
const port = 3000

//设置允许跨域请求
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
  res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
  res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

//bodyParser.urlencoded 用来解析request中body的 urlencoded字符，只支持utf-8的编码的字符，
// 也支持自动的解析gzip和 zlib。返回的对象是一个键值对，当extended为false的时候，
// 键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({extended: false}));


//请求
//get请求
app.get('/get', (req, res) => res.send('get请求!'))
//post请求
app.post('/post', (req, res) => res.send("post请求！"))
//put请求
app.put('/put', (req, res) => res.send('put请求'))
//delete请求
app.delete('/delete', (req, res) => res.send('delete请求'))

//localhost:3000/img/guowuche.png
//托管静态文件，可以直接在端口后加入public下的路径
//即可访问到，包括js,css,png……等静态文件
//可添加多个静态资源目录，会按照添加顺序去查找
app.use(express.static('public'))
//localhost:3000/public/images/guowuche.png带有静态资源目录文件夹，上面的不带
app.use('/public/images', express.static('public/images'))

//module写法，获取导出的类
let connection = require("./db/mysqldb")
//localhost:3000/api/get
//数据库进行文件操作
app.get('/api/get', (req, res) => {
  const sqlstr = 'select * from person where id=2'
  connection.query(sqlstr, (err, results) => {
    if (err) {
      res.json({err_code: 1, message: '操作失败'})
    } else {
      res.json({err_code: 200, message: results})
    }
  })
})

//localhost:3000/api/json
//读取json
app.get('/api/json', (req, res) => {
  var file = path.join(__dirname, 'db/jsondb.json'); //文件路径，__dirname为当前运行js文件的目录
  fs.readFile(file, 'utf-8',  (err, data) =>{
    if (err) {
      res.send('文件读取失败');
    } else {
      res.send(data);
    }
  });
})
//启动服务
app.listen(port, () => console.log(`Example app listening on port ${port}!`))