import { model, Schema } from "mongoose";

const expenseSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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