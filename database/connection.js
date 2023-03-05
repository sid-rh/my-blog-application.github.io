const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config();

const DB = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
)

DB.connect((err) => {
    if (!err) {
        console.log("Connected to db");
        DB.query(`SELECT 1 FROM blogs`, (err, result) => {
            if (err) {
                console.log("creating table")
                DB.query(`CREATE TABLE blogs(
                    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                    title VARCHAR(60) NOT NULL,
                    img_url TEXT NOT NULL,
                    description VARCHAR(100) NOT NULL,
                    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`)

                console.log("Table created")
            }
            else {
                console.log("Table already exist")
            }
        })

        DB.query(`SELECT 1 FROM users`, (err, result) => {
            if (err) {
                console.log("creating table users");
                DB.query(`CREATE TABLE users(
                    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                    username VARCHAR(50) NOT NULL,
                    email VARCHAR(100) NOT NULL,
                    password VARCHAR(50) NOT NULL
                )`)
                console.log("Table created users");
            }
            else {
                console.log("table exists user");
            }
        })
    }
    else {
        console.log("failed to connect: " + err);
    }
})

module.exports = DB;