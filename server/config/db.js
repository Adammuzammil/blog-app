import mongoose from "mongoose";


const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected");
    } catch (error) {
        console.log({ err});
    process.exit(1);
    }
}

export default connectDB;