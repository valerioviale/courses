const mongoose = require('mongoose'); //inluding mongoose
const bcrypt = require('bcrypt'); //to encrypt the password

const saltRounds = 10; //how many time the algorytm repite to encrypt

// we specify the field we need for the registration
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true }, //user has to be unique
    password: { type: String, required: true }
});

// we could execute the function before data ara saved
UserSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        const document = this;

        bcrypt.hash(document.password, saltRounds, function (err, hashedPassword) {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

UserSchema.methods.isCorrectPassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}

module.exports = mongoose.model('User', UserSchema);
