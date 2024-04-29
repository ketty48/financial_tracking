const calculateTotalIncome = async (userId) => {
 
  const user = await UserModel.findById(userId);
  return user.income;
};

const calculateTotalExpenses = async (userId) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const totalExpenses = await ExpenseModel.aggregate([
      {
          $match: {
              user: userId,
              createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth }
          }
      },
      {
          $group: {
              _id: null,
              total: { $sum: "$amount" }
          }
      }
  ]);

  return totalExpenses.length > 0 ? totalExpenses[0].total : 0;
};
const checkExpenseExceedsIncome = async (userId) => {
  const totalExpenses = await calculateTotalExpenses(userId);
  const user = await UserModel.findById(userId);
  const income = user.income;

  if (totalExpenses > income) {
      // Trigger notification
      sendExpenseExceedsIncomeNotification(userId);
  }
  
};

const sendExpenseExceedsIncomeNotification = async(userId) => {
  const user = await UserModel.findById(userId);
  const message = `Dear ${user.name}, your total expenses have exceeded your income. Please review your spending.`;
  NotificationService.sendEmail(user.email, "Expense Exceeds Income Alert", message);
};


const calculateTotalBudget = async (userId) => {
  const budgets = await BudgetModel.find({ user: userId });
  return budgets.reduce((total, budget) => total + budget.limit, 0);
};

const checkBudgetExceedsIncome = async (userId) => {
  const totalBudget = await calculateTotalBudget(userId);
  const user = await UserModel.findById(userId);
  const income = user.income;

  if (totalBudget > income) {

      sendBudgetExceedsIncomeNotification(userId);
  }
};

const sendBudgetExceedsIncomeNotification = async(userId) => {
  const user = await UserModel.findById(userId);
  const message = `Dear ${user.name}, your total budget for the month has exceeded your income. Please review your budgeting.`;
  NotificationService.sendEmail(user.email, "Budget Exceeds Income Alert", message);
};
