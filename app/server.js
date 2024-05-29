const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const https = require("https");

const app = express();
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(userRoutes);
app.use(adminRoutes);

const options = { 
  key: fs.readFileSync("keys/server.key"), 
  cert: fs.readFileSync("keys/server.cert") 
};

https.createServer(options, app).listen(443, () => {
  console.log("Server is running on port 443");
});

