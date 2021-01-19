import userService from '../../services/user';

export const initUser = () => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const { token } = JSON.parse(userJson);
      const user = await userService.initUser(token);

      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: 'INIT_USER',
        user,
      });
    }
  };
};

export const signupUser = (user) => {
  return async (dispatch) => {
    const response = await userService.signup(user);

    if (response.isAxiosError) {
      return { error: response.response.data };
    }
    localStorage.setItem('user', JSON.stringify(response));
    dispatch({ type: 'SIGNUP', user: response });
  };
};

export const loginUser = (user) => {
  return async (dispatch) => {
    const response = await userService.login(user);

    if (response.isAxiosError) {
      return { error: response.response.data };
    }

    localStorage.setItem('user', JSON.stringify(response));

    dispatch({
      type: 'LOGIN',
      user: response,
    });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };
};

export const deleteUser = () => {
  return async (dispatch) => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const { token } = JSON.parse(userJson);
      localStorage.removeItem('user');
      userService.deleteOne(token);
      dispatch({ type: 'DELETE_USER' });
    }
  };
};
