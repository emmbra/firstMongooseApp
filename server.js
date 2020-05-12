const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');


const app = express();

// when in development, use port 3001
// when in production, use heroku port
const PORT = process.env.PORT || 3001;

// grabs inputs from form 
app.use(express.urlencoded({ extended: true }));
// grabs input and puts it in req.body
app.use(express.json());

// connect mongo database
// if db doesn't exist, mongo auto makes and uses db
// mongoose calls MongoClient.connect under the hood for useNewUrlParser
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/redux_todo_db', { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(PORT);
