const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "bounce",
    waitForConnections: true,
    connectionLimit: 10, // You can change this depending on your needs
    queueLimit: 0,
});

module.exports = db;
