import mongoose  from "mongoose";

const userSchema = new mongoose.Schema ({
    name : {
        type: {
            first: String,
            last: String
        },
        required: true
    },
    age: Number
});

export const User = mongoose.model('User', userSchema);