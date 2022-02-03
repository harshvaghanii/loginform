const express = require('express');
const app = express();
const hostName = '127.0.0.1';
const port = 80;
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: `../.env` });
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



            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                },
            });

            let mailOptions = {
                from: `Harsh Vaghani`, // sender address
                to: `${req.body.email}`, // list of receivers
                subject: "Thank You for Registering with Vaghani's Kitchen!", // Subject line
                html: `Hello ${req.body.username},<br><br>
                Greetings of the day!<br><br>
                We are so happy to welcome you as a member of Vaghani's Kitchen! Thank you for your trust in us! We would love to serve you yummy meals!<br><br>
                Thanks & Regards,<br>
                Harsh Vaghani`,
            }

            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(`Sent!`);
                }
            })

            const registered = await user.save();
            console.log(`User added!`);
            res.status(201).redirect('/');
        }



    } catch (error) {
        res.status(401).redirect('/form');
    }
})

// Listening to the port

app.listen(port, hostName, () => {
    console.log(`The server has started at port http://${hostName}:${port}`);
})