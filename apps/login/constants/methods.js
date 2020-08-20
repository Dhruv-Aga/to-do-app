/* 
 * Constanst Methods for Login Module 
*/

// Creating a valid url path
module.exports.toUrl = async function(path) {
    return "127.0.0.1:3000/api/" + path
}