/* 
 * User Route for login and user detail apis
*/

// Basic express imports
var router = require('express').Router();
var multer = require('multer'); // For image upload
var path = require('path');

var upload = multer({ dest: 'public/uploads/images' }) // setup directory for image upload
var mailer = require('@/bin/mailer'); // Mail plugin
var User = require('./../models/User');
var methods = require('./../constants/methods');
var auth = require('@/apps/auth'); // Authorisation Middleware

/* 
 * Login API
*/
router.post('/login', async function (req, res) {
    if (!req.body.user.email) {
        return res.status(422).json({ error: 1, msg: { email: "can't be blank" } });
    }
    if (!req.body.user.password) {
        return res.status(422).json({ error: 1, msg: { password: "can't be blank" } });
    }

    // Finding User
    const user = await User.findOne({ email: req.body.user.email }).select('+password');

    // Validation User password
    if (user && user.validPassword(req.body.user.password)) {
        user.token = user.generateJWT();
        var x = user.toAuthJSON()
        x.expiresIn = 60
        x.localId = x.salt
        return res.json({ user: x });
    } else {
        var info = {
            error: 1,
            msg: "username or Password is wrong"
        }
        return res.status(422).json(info);
    }
});


/* 
 * Sign Up API
*/
router.post('/signup', function (req, res, next) {
    var re = /\S+@\S+\.\S+/;

    if (!req.body.user.name) {
        return res.status(422).json({ error: 1, msg: "name " + "can't be blank" });
    }
    if (!req.body.user.mobile) {
        return res.status(422).json({ error: 1, msg: "mobile no " + "can't be blank" });
    }
    // Validating Unique and syntaxically valid email
    if (!req.body.user.email) {
        return res.status(422).json({ error: 1, msg: "email " + "can't be blank" });
    } else if (!re.test(req.body.user.email)) {
        return res.status(422).json({ error: 1, msg: "email " + "format is wrong" });
    } else if (!User.find({ email: req.body.user.email }).then(function (user) { if (user) { return 0 } else { return 1 } }).catch(function () { return 0 })) {
        return res.status(422).json({ error: 1, msg: "email " + "already registered" });
    }

    if (!req.body.user.password) {
        return res.status(422).json({ error: 1, msg: "password " + "can't be blank" });
    }

    // Initialised new User
    var user = new User();
    user.name = req.body.user.name;
    user.mobile = req.body.user.mobile;
    user.email = req.body.user.email;
    user.setPassword(req.body.user.password);
    
    // Saving Details
    user.save().then( async function () {
        // Generating Verification URL
        var url = await methods.toUrl(`v1/users/verify?token=${user.email}||||${user.salt}`)
        var html = `<h2>Click on below Verification Link: </h2>${url}`
        mailer.send(
            '"Dhruv" <dhruvaga11@gmail.com>', // sender address
            user.email, // list of receivers
            "Verification Link", // Subject line
            html, // html body
        )
        return res.json({error: 0, msg: "Please check your email for verification link"});
    }).catch(next);
});


/* 
 * Logout API
*/
router.post('/logout', function (req, res) {
    req.logout();
    res.sendStatus(200);
});


/* 
 * User detail API
*/
router.get('/detail', auth.required, async function (req, res) {
    const user = await User.findById(req.payload.id);
    res.status(200).json(user.toJSONFor());
});



/* 
 * Email Address Verification API
*/
router.get('/verify', async function (req, res) {
    var email = req.query.token.split("||||")[0]
    var salt = req.query.token.split("||||")[1]
   
    const user = await User.findOneAndUpdate({email: email, salt: salt}, {verify: true});
   
    if(user) res.sendFile(path.join(__dirname + './../views/verify_success.html'));
    res.sendFile(path.join(__dirname + './../views/verify_error.html'));
});


/* 
 * Image Upload API
*/
router.post('/upload', auth.required, upload.single('upload'), (req, res) => {
    res.json({
      uploaded: true,
      url: 'http://127.0.0.1:3000/uploads/images/' + req.file.filename
    })
  })

module.exports = router;