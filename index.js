const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const app = express();
var cors = require('cors')

dotenv.config();
//Body parser midleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));


vconst corsOptions = {
    origin: process.env.ENDPOINT,
    optionsSuccessStatus: 200
};
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.listen(port, () => console.log('Server started...'));

app.get('/', (req, res) => {
    res.render('contact');
});

app.post('/api/mail/send', async (req, res) => {
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

