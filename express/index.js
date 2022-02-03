const express = require('express');
const app = express();
const hostName = '127.0.0.1';
const port = 80;
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('../database/connection/app.js');
const register_user = require('../database/schemas/userdata');

// Setting the static directory
const static_path = path.join(__dirname, '../public');
app.use(express.static(static_path));

// Using the body parser for post request
app.use(bodyParser.urlencoded({ extended: false }))


// Registering the partials

const partialPath = path.join(__dirname, "../partials");
hbs.registerPartials(partialPath);


// Setting the views
const viewPath = path.join(__dirname, "../Handlebars");
app.set('view engine', 'hbs');
app.set('views', viewPath);

app.get("", (req, res) => {
    res.render('index');
})

app.get("/form", (req, res) => {
    res.render('form');
})

app.post('/form', async(req, res) => {
    try {
        const pw = req.body.password;
        const cpw = req.body.confirmpassword;

        if (pw != cpw) {
            console.log(`Wrong passwords!`);
            res.render(`form`);
        } else {
            const user = new register_user({
                username: req.body.username,
                email: req.body.email,
                password: pw,
                confirmPassword: cpw
            });


            let testAccount = await nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "eqcwgfxmsftylsku@ethereal.email", // generated ethereal user
                    pass: "CmGcJwgfYPWBvQGvDb", // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: `Harsh Vaghani <harshvaghani98@express.com>`, // sender address
                to: `${req.body.email}`, // list of receivers
                subject: "Thank You for Registering with Vaghani's Kitchen!", // Subject line
                text: `Hello There!`,
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

            const registered = await user.save();
            console.log(`User added!`);
            res.status(201).render('index');
        }



    } catch (error) {
        res.status(401).send(error);
    }
})

// Listening to the port

app.listen(port, hostName, () => {
    console.log(`The server has started at port http://${hostName}:${port}`);
})