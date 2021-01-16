import axios from 'axios';
import { baseUrl } from './config';

const initUser = async (token) => {
  const response = await axios.get(`${baseUrl}/user/init`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const signup = async (user) => {
  try {
    const response = await axios.post(`${baseUrl}/user/signup`, user);
    return response.data;
  } catch (error) {
    return error;
  }
};

const login = async (user) => {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, user);
    return response.data;
  } catch (error) {
    return error;
  }
};

const userService = {
  initUser,
  signup,
  login,
};

export default userService;
