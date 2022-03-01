const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { PORT = 4000 } = process.env;
const app = express();

const whitelist = [
    'http://localhost:3000',
];

const corsOptions = {
    origin(origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not alliwed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

mongoose.connect('mongodb+srv://IvanVideo:Hfvfpfyjd92@cluster0.wnctn.mongodb.net/softlex?retryWrites=true&w=majority');

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.use(errors());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});