import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
const app = express();
import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = "mongodb+srv://jd_db_user:mydbpass@somo.vmkkk3u.mongodb.net/?appName=somo";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);


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

//Express set up
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5000', //React fe url
}))

//sample route to check if the backend is working

app.get('/', (req, res) => {
    res.send('App configuration is working!');
});

app.post('/register', async (req, res) => {
    try {
        const user = new User(req.body);
        let result =  await user.save();
        if(result){
            delete result.password; //ensure no sending sensitive data
            res.status(201).send(result); //send successful response
        }else {
            console.log("User already exists!");
            res.status(400).send("User already exists!");
        }
    }catch (error) {
        res.status(400).send({Message: "Something went wrong!", error: error.message});
    }
});

// start the server
app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});