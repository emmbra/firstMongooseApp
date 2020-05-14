const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

// when in development, use port 3001
// when in production, use heroku process.env to select port
const PORT = process.env.PORT || 3001;

// middlewares
// grabs inputs from form, body parser
app.use(express.urlencoded({ extended: true }));
// grabs input and puts it in req.body
app.use(express.json());

app.use(routes);

// this will make it so that passport knows we have strategies defined and runs the code line by line
require('./services/passport');

// connect mongo database
// if db doesn't exist, mongo auto makes and uses db
// mongoose calls MongoClient.connect under the hood for useNewUrlParser
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/redux_todo_db', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
app.listen(PORT);
