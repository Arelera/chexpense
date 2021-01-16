const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
    case 'SIGNUP':
    case 'LOGIN':
      return action.user;
    default:
      return state;
  }
};

export default reducer;
