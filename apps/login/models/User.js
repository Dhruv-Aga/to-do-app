/* 
 * User Model contains personal and auth details
*/

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('@/bin/config').secret;

var UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        lowercase: true, 
        unique: true, 
        required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true 
    },
    name: { 
        type: String, 
        required: [true, "can't be blank"],
    },
    mobile: Number,
    image: String,
    hash: String,
    salt: String,
    verify:  {
        type: Boolean,
        default: false,
        select: false
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// To validate unique email
UserSchema.plugin(uniqueValidator, { message: 'Email is already taken' });

// UserSchema.pre(/^find/, function (next) {
//     // This points to the current query
//     this.find({ verify: { $eq: true } })
//     next()
// })

// To verify password at time of login
UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

// To set password at time of signup
UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

// To generate token at time of login
UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        email: this.email,
        exp: parseInt(exp.getTime() / 1000),
    }, secret, {
        algorithm: 'HS256',
    });
};

// To generate vald json at time of login
UserSchema.methods.toAuthJSON = function() {
    return {
        name: this.name,
        email: this.email,
        token: this.generateJWT(),
    };
};

// To generate vald json at time of fetching details
UserSchema.methods.toJSONFor = function() {

    return {
        id: this._id,
        name: this.name,
        email: this.email,
        mobile: this.mobile,
        image: this.image
    };
};

module.exports = mongoose.model('User', UserSchema);