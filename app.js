//declaring const express, path, bodyParser, app
const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const app           = express();

const bcrypt        = require('bcrypt');
const mongoose      = require('mongoose');
const User          = require('./user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

const mongo_uri = 'mongodb+srv://mongo:carnival@cluster0.2kd43gq.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongo_uri, function(err){
    if (err) {
        throw err;
    } else {
        console.log(`successfully connected to ${mongo_uri}`);
    }
});


app.post('/register', (req, res) => {
    const {firstName, lastName, username, password} = req.body; 

    const user = new User({firstName, lastName, username, password});
    
    user.save(err => {
        if(err){
            res.status(500).send('error for user registration');
        }else{
            res.status(200).send('registration complete');
        }
    });
});

app.post('/autenticate', (req, res) => {
    const {username, password} = req.body; 

    User.findOne({username},(err, user) => {
            if (err) {
                res.status(500).send('error for user registration');
            } else if (!user) {
                res.status(500).send('the user does not exist');
            } else {
                User.isCorrectPassword(password, (err, result) => {
                    if (err) {
                        res.status(500).send('autentication error');
                    } else if (result) {
                        res.status(200).send('User autenticated');
                    } else {
                        res.status(500).send('User and/or password wrong');
                    }
                });
            }
        });
});


app.listen(3000, () => {
    console.log('server started');
})
module.exports = app;