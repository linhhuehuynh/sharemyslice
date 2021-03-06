const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const config = require('config');
const cors = require('cors');

//Express Bodyparser Middleware
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//Enable CORS
app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
})

//DB Config 
const db = config.get('mongoURI');

//Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

//Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/requestitem', require('./routes/api/requestitem'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

//Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });

}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));