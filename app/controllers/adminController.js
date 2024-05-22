const crypto = require('crypto');
const userModel = require('../models/userModel');
const mysql = require("mysql2");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "db_183",
  port: 6033,
};
const connection = mysql.createConnection(dbConfig);

exports.adminPage = (req, res) => {
  res.send(`
    <form action="/admin/search" method="get">
      <input type="text" name="name" placeholder="Nom utilisateur">
      <button type="submit">Rechercher</button>
    </form>
  `);
};

exports.searchUsers = (req, res) => {
  const { name } = req.query;
  const query = `SELECT * FROM t_users WHERE username LIKE ?`;
  connection.query(query, [`%${name}%`], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length > 0) {
      res.json(results);
    } else {
      res.json({ message: "No users found" });
    }
  });
};
