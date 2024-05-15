const mysql = require("mysql2");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "db_183",
  port: 6033,
};
const connection = mysql.createConnection(dbConfig);

const isAdmin = (req, res, next) => {
  const userId = req.session.userId;

  if (!userId) {
    res.status(401).json({ error: "Vous devez vous connecter" });
    return;
  }

  const query = `SELECT username FROM t_users WHERE id = ?`;
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const username = results[0].username;
    if (username !== 'admin') {
      res.status(403).json({ error: "Accès refusé. Administrateurs uniquement." });
      return;
    }

    next();
  });
};

module.exports = isAdmin;
