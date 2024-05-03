import { mongoose} from "mongoose";
  const goalSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    targetAmount: {
      type: Number,
      required: true
    },
    deadline: Date,
    achieved: {
      type: Boolean,
      default: false
    }
    // Add any additional goal fields here
  });
  
  const Goal = mongoose.model('Goal', goalSchema);
  export default Goal;