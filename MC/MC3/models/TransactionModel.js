import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    refno: {
        type: Number,
        required: true,
        unique: true,   
    },
    amount: {
        type: Number,
        required: true,
    }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;