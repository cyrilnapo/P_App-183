const mysql = require("mysql2");
const crypto = require("crypto");
const userModel = require("../models/userModel");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "db_183",
  port: 6033,
};
const connection = mysql.createConnection(dbConfig);

exports.getUserProfile = (req, res) => {
  const userId = req.session.userId;
  const username = req.params.username;

  //est ce que l'utilisateur est connecté à un compte
  if (!userId) {
    res.status(401).json({ error: "Vous devez vous connecter" });
    return;
  }

  const query = `SELECT * FROM t_users WHERE username = ?`;
  connection.query(query, [username], (err, results) => {
    //erreur imprévue
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    //le user voulu n'existe pas 
    if (results.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    //l'utilisateur n'est pas connecté au compte qu'il veut consulté
    if (userId !== results[0].id) {
      res.status(403).json({
        error: "Vous devez être connecté à ce compte pour le consulter",
      });
      return;
    }

    const userProfile = results[0];
    res.json(userProfile);
  });
};


exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  
  // Vérifier si l'utilisateur existe
  userModel.getUserByUsername(username, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    // Vérifier le mot de passe
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    if (user.password !== hashedPassword) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    } else {
      req.session.userId = user.id;
    }

    // Authentification réussie
    res.json({ message: "Login successful" });
  });
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
    res.json(results);
  });
};

exports.signupUser = (req, res) => {
  const { username, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  userModel.getUserByUsername(username, (err, existingUser) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    if (existingUser) {
      res.status(400).json({ error: "Username already exists" });
      return;
    }

    // Hasher le mot de passe
    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    // Créer un nouvel utilisateur
    const newUser = { username, password: hashedPassword };
    userModel.saveUser(newUser, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({ message: "Signup successful" });
    });
  });
};

exports.homePage = (req,res) => {
  res.send(`
    <form action="/login" method="post">
      <h1>login (pour utilisastion admin page)</h1>
      <input type="text" name="username" placeholder="Nom utilisateur">
      <input type="password" name="password" placeholder="Mot de passe">
      <button type="submit">Se connecter</button>
    </form>
  `);
  
};