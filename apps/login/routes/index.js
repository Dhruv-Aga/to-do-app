/* 
 * Index Route to accumulate all route for login module 
 * and implementing middileware for error handling
*/

var router = require('express').Router();

// Setup routes for user details and login
router.use('/', require('./users'));

router.use(function (err, req, res, next) {
  // Middleware for response error handling
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      error: 1,
      msg: err.message
    });
  }
  else if (err.name === 'UnauthorizedError') {
    return res.status(422).json({
      error: 1,
      msg: "Unauthorized User"
    })
  }

  return next(err);
});

module.exports = router;