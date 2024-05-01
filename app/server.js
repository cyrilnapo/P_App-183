const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./routes/userRoutes");

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
