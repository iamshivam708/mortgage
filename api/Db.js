const mysql = require('mysql');

var dbConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mortgage'
})

dbConn.connect((error) =>{
    if(error){
        console.log(error)
    }
    else{
        console.log("Database Connected");
    }
})

module.exports = dbConn;