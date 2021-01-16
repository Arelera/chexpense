import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import expenseReducer from './reducers/expenseReducer';
import userReducer from './reducers/userReducer';

const store = createStore(
  combineReducers({
    expenses: expenseReducer,
    user: userReducer,
  }),
  applyMiddleware(thunk)
);
export default store;
