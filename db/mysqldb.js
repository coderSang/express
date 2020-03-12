const mysql = require("mysql")
const connection = mysql.createConnection({
  hots: "localhost",
  port: 3306,
  user: "root",
  password: "123",
  //数据库名字
  database: "nodejstest"
})

connection.connect((err) => {
  if (err) {
    console.log("连接失败");
  } else {
    console.log("连接成功");
  }
})

let query = (sql, callback) => {
  connection.query(sql, (err, rows) => {
      callback(err, rows)
    }
  )
}

// export default connection
exports.query = query