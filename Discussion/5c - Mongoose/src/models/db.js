import mongoose from "mongoose";

export const connect = () => {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log('Successfully connected to Mongodb')
    }).catch(err => {
        console.error('Failed to connect to mongodb: ' + err);
        process.abort();
    });
}