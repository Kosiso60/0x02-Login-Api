const express = require("express")
const mysql = require("mysql")
const app = express ()
const appController = require('./app')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database: ''
});

connection.connect(function(err) {
    if (err) {
      console.error('error')
    }else{
        console.log('connected')
    }
  });

  app.get("/", function(req, res){
    res.send
  })

app.listen(3000, function(req, res){
 console.log("server is running on port 3000")
})

appController.something