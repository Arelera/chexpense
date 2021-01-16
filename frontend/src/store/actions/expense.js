import expenseService from '../../services/expense';

export const createExpense = (amount) => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const { token } = JSON.parse(userJson);
      expenseService.createOne(id, amount, token);
    }

    dispatch({ type: 'CREATE_EXPENSE', expense });
  };
};
