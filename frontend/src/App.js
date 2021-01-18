import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import ExpenseList from './components/ExpenseList/ExpenseList';
import Header from './components/Header/Header';
import UserForm from './components/UserForm/UserForm';
import { getExpenses } from './store/actions/expense';
import { initUser } from './store/actions/user';

const Div = styled.div`
  min-height: 100vh;
  ${({ theme }) =>
    css`
      padding: ${theme.s4} 0;
      background: ${theme.gray1};
      @media screen and (min-width: 400px) {
        padding: ${theme.s4};
      }
    `};
`;

const InnerDiv = styled.div`
  margin: 0 auto;
  max-width: 600px;
`;

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(initUser()).then((res) => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getExpenses());
    }
  }, [user]);

  if (isLoading) return <p>Loading</p>;
  return (
    <Div>
      <InnerDiv>
        {user ? (
          <>
            <Header />
            <ExpenseForm />
            <ExpenseList />
          </>
        ) : (
          <UserForm />
        )}
      </InnerDiv>
    </Div>
  );
}

export default App;
