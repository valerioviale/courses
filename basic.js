//declaring const express, path, bodyParser, app
const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const app           = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    });
app.listen(3000, () => {
    console.log('server started');
})
module.exports = app;