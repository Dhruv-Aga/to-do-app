/* 
 * Importing libraries
*/
var jwt = require('express-jwt');
var secret = require('@/bin/config').secret;

// Extracting token from Request
function getTokenFromHeader(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

// Defining srtegy for extracting details from token from Frontend
var auth = {
  required: jwt({
    secret: secret,
    userProperty: 'payload',
    getToken: getTokenFromHeader, 
    algorithms: ['HS256']
  }),
  optional: jwt({
    secret: secret,
    userProperty: 'payload',
    credentialsRequired: false,
    getToken: getTokenFromHeader, 
    algorithms: ['RS256']
  })
};

module.exports = auth;