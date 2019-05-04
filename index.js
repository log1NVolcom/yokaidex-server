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

var whitelist = [process.env.ENDPOINT, process.env.ENDPOINT2];

var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.listen(port, () => console.log('Server started...'));
app.options('*', cors());

app.post('/api/mail/send', cors(), async (req, res) => {
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
        html: `${body.message}`
    };

    let info = await transporter.sendMail(mailOptions)


    return res.status(200).send(info);

});

