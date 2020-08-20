/* 
 * Mailer Instance to be used everywhere, 
 * Put all the configuration here only
*/

const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing

    // create reusable transporter object using the default SMTP transport
    return nodemailer.createTransport(smtpTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        auth: {
            user: "dhruv.1610051@kiet.edu",
            pass: "Dhruvaga11@"
        }
    }));
}
let transporter = null
main().then((transport => {
    transporter = transport
})).catch(console.error);

// Send mail caller function
module.exports.send = async function (from, to, subject, body) {
    let info = await transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: body, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent msg confirmation
}