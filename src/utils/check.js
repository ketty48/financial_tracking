// Import required modules
import cron from 'node-cron';
import userModel from '../models/user.model.js';
import { checkBudgetExceedsIncome} from "../utils/helperFunctions.js"

// Schedule task to check budget against income every day at midnight
export const job=cron.schedule('0 0 * * *', async () => {
    try {
        const users = await userModel.find();
        for (const user of users) {
            await checkBudgetExceedsIncome(user.id);
        }
    } catch (error) {
        console.error("Error checking budget against income:", error);
    }
});

