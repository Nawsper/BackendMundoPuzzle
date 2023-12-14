import mongoose from 'mongoose';

const connectionString = "mongodb://127.0.0.1:27017/mundoPuzzle";

async function connectToDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDatabase();

export default mongoose.connection;