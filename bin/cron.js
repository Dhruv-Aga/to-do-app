/* 
 * Put all the crons in this files
*/
var cron = require('node-cron');
var http = require('axios');

console.log('Crons have setup succesfully');
cron.schedule('0 19 * * *', () => {
    console.log('running a task every 7:00 PM');
    http.get('http://127.0.0.1:3000/api/v1/tasks/script').then(function(res){
        console.log(res)
    }).catch(function(err){
        console.log(err)
    })
});