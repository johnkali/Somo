import mongoose from "mongoose";

//schema for users of the app
const userSchema =  new mongoose.Schema({
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
        unique: true, //no email duplicates
    },
    password: {
        type: String,
        required: true,
    },
});

export  default mongoose.model('Users', userSchema);

