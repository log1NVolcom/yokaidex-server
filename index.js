const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
//Body parser midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(5000, () => console.log('Server started...'));

app.get('/', (req, res) => {
    res.render('contact');
});

app.post('/send', async (req, res) => {
    let account = await nodemailer.createTestAccount();
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: pass
        }
    });

    const { body } = req;

    let mailOptions = {
        from: `${body.email}`,
        to: "yokaidexofficial@gmail.com",
        subject: `${body.subject}`,
        text: "",
        html: `${body.mensage}`
    };

    let info = await transporter.sendMail(mailOptions)

})

