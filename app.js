const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

const groupsRoutes = require('./api/routes/groups');
const savingsRoutes = require('./api/routes/savings');
const userRoutes = require("./api/routes/user");

mongoose.connect('mongodb://localhost/digiajo', { useNewUrlParser: true }).then(() => console.log('working db'))

mongoose.Promise = global.Promise;



// Routes which should handle requests
app.use('/groups', groupsRoutes);
app.use('/savings', savingsRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});



module.exports = app;