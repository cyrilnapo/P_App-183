const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(bodyParser.json());
app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
