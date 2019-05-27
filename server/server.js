const express = require('express');

const app = express();
const bodyParser = require('body-parser');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//email transporter
const nodemailer = require('nodemailer');
const creds = require('./email-config');

const transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: creds.user,
        pass: creds.pass
    }
}

const transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

// routes
app.post('/send', (req, res) => {
    const name = req.body.name
    const sendEmail = req.body.sendEmail
    const message = req.body.message
    const content = `from: ${name} \n reply to: ${sendEmail} \n message: ${message} `

    const mail = {
        from: name,
        to: req.body.recEmail,  //Change to email address that you want to receive messages on
        subject: req.body.subject,
        text: content
    }

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                msg: 'fail'
            })
        } else {
            res.json({
                msg: 'success'
            })
        }
    })
}) //end POST route

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
