import mongoose from "mongoose";

const { Schema } = mongoose;

const expenseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Assuming your user model is named 'User'
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
    // Add any additional expense fields here
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
