const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/foodwebsite')
    .then(() => {
        console.log(`Succesfully connected!`);
    }).catch((e) => {
        console.log(`Connection failed!`);
    });