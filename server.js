const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors'); // Import the cors package
const path = require('path');
require('dotenv').config();

const globalConfigs = require('./routes/globalConfigs');
const users = require('./routes/user');
const posts = require('./routes/post');
const comments = require('./routes/comments');
const awards = require('./routes/awards');
// const mainRoute = require('./routes/index');

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your Vite frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true // Allow credentials (optional)
}));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
 const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use Routes
app.use('/api/configs', globalConfigs);
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/comments', comments);
app.use('/api/awards', awards);
// app.use('/', mainRoute);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  // app.use(express.static('client/build'));
  app.use(express.static('static/dist'));

  app.get('*', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    res.sendFile(path.resolve(__dirname, 'static', 'dist', 'index.html'));
  });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
