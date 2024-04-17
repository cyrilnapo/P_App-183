const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_183',
    port: 6033 
});


db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de donnée mysql :', err);
        return;
    }
    console.log('Connecté à la base de donnée mysql');
});


