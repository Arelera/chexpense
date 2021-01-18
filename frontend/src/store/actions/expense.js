import expenseService from '../../services/expense';

export const getExpenses = () => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const { token } = JSON.parse(userJson);
      const expenses = await expenseService.getAll(token);
      dispatch({ type: 'GET_EXPENSES', expenses });
    }
  };
};

export const createExpense = (amount) => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const { token } = JSON.parse(userJson);
      const newExp = await expenseService.createOne(amount, token);
      dispatch({ type: 'CREATE_EXPENSE', expense: newExp });
    }
  };
};

export const deleteExpense = (id) => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const { token } = JSON.parse(userJson);
      expenseService.deleteOne(id, token);
      dispatch({ type: 'DELETE_EXPENSE', id });
    }
  };
};
