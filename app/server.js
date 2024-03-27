const express = require("express");
const app = express();

const userRoute = require('./routes/User');
//const authRoute = require('./routes/Auth');

app.use('/user', userRoute);
//app.use('/login', authRoute);

app.listen(8080, () => {
    console.log('Server running on port 8080');
});
