import axios from 'axios';
import { baseUrl } from './config';

const getAll = async (token) => {
  try {
    const response = await axios.get(`${baseUrl}/expense`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createOne = async (amount, token) => {
  try {
    const response = await axios.post(
      `${baseUrl}/expense`,
      { amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const deleteOne = async (id, token) => {
  try {
    const response = await axios.delete(`${baseUrl}/expense/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

const expenseService = {
  getAll,
  createOne,
  deleteOne,
};

export default expenseService;
