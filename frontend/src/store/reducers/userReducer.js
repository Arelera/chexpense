const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
    case 'SIGNUP':
    case 'LOGIN':
      return action.user;
    case 'LOGOUT':
    case 'DELETE_USER':
      return null;
    default:
      return state;
  }
};

export default reducer;
