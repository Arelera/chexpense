import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { deleteExpense } from '../../store/actions/expense';
import ExpenseLi from './Expense/ExpenseLi';

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ExpenseList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);

  const expenseDeleteHandler = (id) => {
    dispatch(deleteExpense(id));
  };

  return (
    <Div>
      {expenses?.map((exp) => (
        <ExpenseLi
          amount={exp.amount}
          deleteHandler={() => expenseDeleteHandler(exp.id)}
          key={exp.id}
        />
      ))}
    </Div>
  );
};

export default ExpenseList;
