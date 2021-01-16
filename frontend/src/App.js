import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import Header from './components/Header/Header';
import UserForm from './components/UserForm/UserForm';
import { initUser } from './store/actions/user';

const Div = styled.div`
  min-height: 100vh;
  ${({ theme }) =>
    css`
      padding: ${theme.s4};
      background: ${theme.gray1};
    `};
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

  if (isLoading) return <p>Loading</p>;
  return (
    <Div>
      {user ? (
        <>
          <Header />
          <ExpenseForm />
        </>
      ) : (
        <UserForm />
      )}
    </Div>
  );
}

export default App;
