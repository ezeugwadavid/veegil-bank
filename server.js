const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


const app = express();

const cors = require('cors');
app.use(cors());
//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const users = require('./routes/api/users');
const transactions = require('./routes/api/transactions');

//DB config
const db = require('./config/keys').mongoURI;

// Connect to mongo DB
mongoose
.connect(db,{ useNewUrlParser: true,  useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/transactions', transactions);


// Server static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));

    });  
}

const port = process.env.PORT || 6000;        

app.listen(port, () => console.log(`Server running on port ${port}`));