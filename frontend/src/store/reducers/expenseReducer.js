const reducer = (state = null, action) => {
  switch (action.type) {
    case 'GET_EXPENSES':
      return action.expenses;
    case 'CREATE_EXPENSE':
      return [...state, action.expense];
    case 'DELETE_EXPENSE':
      return state.filter((exp) => exp.id !== action.id);

    default:
      return state;
  }
};

export default reducer;
