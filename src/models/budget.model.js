import mongoose from "mongoose";
const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  budgets: [{
    category: {
      type: String,
      required: true
    },
    limit: {
      type: Number,
      required: true
    }
  }]
});


const Budget = mongoose.model('Budget', budgetSchema);
export default Budget;
