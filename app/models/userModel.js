const mysql = require('mysql2');
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'db_183',
  port: 6033
};
const connection = mysql.createConnection(dbConfig);

exports.getUserByUsername = (username, callback) => {
  const query = `SELECT * FROM t_users WHERE username = ?`;
  connection.query(query, [username], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    const user = results[0];
    callback(null, user);
  });
};

exports.saveUser = (userData, callback) => {
  const query = `INSERT INTO t_users SET ?`;
  connection.query(query, userData, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

exports.searchUsersByName = (name, callback) => {
  const query = `SELECT * FROM t_users WHERE username LIKE ?`;
  connection.query(query, [`%${name}%`], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};
