const express = require('express');
const app = express();
const hostName = '127.0.0.1';
const port = 80;
const hbs = require('hbs');
const path = require('path');

// Setting the static directory
const static_path = path.join(__dirname, '../public');
app.use(express.static(static_path));


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



// Listening to the port

app.listen(port, hostName, () => {
    console.log(`The server has started at port http://${hostName}:${port}`);
})