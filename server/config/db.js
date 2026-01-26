import mongoose from 'mongoose'
// const mongoURI = process.env.MONGODB_URI; //error connecting tocreds on .env - check later

const connectDB =  async ()=>{
    try {
        await mongoose.connect('mongodb+srv://jd_db_user:mydbpass@somo.vmkkk3u.mongodb.net/somo?retryWrites=true&w=majority');

        console.log('Connected to DB');
    } catch(error){
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
}

export default connectDB