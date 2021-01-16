import axios from 'axios';
import { baseUrl } from './config';

const createOne = async (amount, token) => {
  try {
    const response = await axios.post(
      baseUrl,
      { amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const expenseService = {
  createOne,
};

export default expenseService;
