const nodeMailer = require('nodemailer')

const sendEmail = async (options)=>{
    const transporter = nodeMailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465,
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    })
    const mailOptions = {
        from: process.env.SMTP_MAIL, // sender address
        to: options.mail, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, // plain text body
    }
    const mail =await transporter.sendMail(mailOptions)
}

module.exports = sendEmail