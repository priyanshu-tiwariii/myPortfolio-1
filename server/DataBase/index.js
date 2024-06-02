import mongoose from 'mongoose';
import { DB_NAME } from '../dbName.js';

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MongoDB connection successful at ${DB_NAME} : ${connect.connection.host}`);
        
    } catch (error) {
        console.log('MongoDB connection failed due to ->', error);
    }
}

export default connectDB;