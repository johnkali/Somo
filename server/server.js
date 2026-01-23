const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");

const app = express();


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/somo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("MongoDB Connected - somo db");
}).catch(err=>{
    console.log("Error connecting to MongoDB - somo db");
})


//schema for users of the app
const UserSchema =  new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    secondName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('users', UserSchema);


app.get('/', (req, res) => {
    res.send('Hello from Express!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});