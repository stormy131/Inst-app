require('dotenv').config();
import { Transporter } from 'nodemailer';
const nodemailer = require('nodemailer');

const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

function sendMail(user: string, comment: string, sender: string){
    const mailOptions = {
        from: process.env.EMAIL,
        to: user,
        subject: 'Inst notification',
        text: `${sender} menshioned you in a comment: ${comment} `
    };

    transporter.sendMail(mailOptions, (err) => {
        if(err){
            throw err;
        }

        console.log('---> Mail was sent!');
    });
};

export default sendMail;