// Import required modules
import cron from 'node-cron';
import userModel from '../models/user.model.js';
import Goal from '../models/goal.model.js';
import { sendEmail } from "../utils/sendEmail.js";

export const job = cron.schedule('0 0 * * *', async () => {
    try {
        const users = await userModel.find();
        const today = new Date();
        const overdueGoals = await Goal.find({ deadline: { $lte: today }, achieved: false });

        // Iterate over each overdue goal and notify the user
        overdueGoals.forEach(async (goal) => {
            // Find the user associated with the goal
            const user = users.find(user => user._id.toString() === goal.user.toString());
            
            // Send notification email to the user
            if (user) {
                await sendEmail(user.email, `You have a goal "${goal.title}" with deadline reached or exceeded.`);
            }
        });
    } catch (error) {
        console.error("Error checking goals deadlines:", error);
    }
});
