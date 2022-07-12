const mysql = require('mysql2')

const DB = module.exports = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

DB.on('error', function(err){
    console.log("Database refuse to connect: " + err.message);
})