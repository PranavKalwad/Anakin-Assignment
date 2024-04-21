const express = require('express');
const app = express();
const pool = require('./utils/db');
const registratonRoute = require('./routes/registrationRoute');
const loginRoutes = require('./routes/loginRoutes');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 4000;

pool.getConnection((err, connection) => {
    if(err) {
        console.log(err);
    }
    if(connection) {
        // connection.release();
        console.log("Connected to IRCTC database");
    }
    return;
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use('/api', registratonRoute);
app.use('/api/login',loginRoutes);