const mysql = require('mysql')
const connexion= mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Sherco+01',
    database : 'recettes'
})

module.exports = connexion