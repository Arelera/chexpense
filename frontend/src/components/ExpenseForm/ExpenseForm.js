import { useState } from 'react';
import styled, { css } from 'styled-components';

const Div = styled.div`
  ${({ theme }) =>
    css`
      background: ${theme.gray1};
      padding: ${theme.s7};
    `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  transition: all 0.2s ease;
  text-align: center;
  outline: none;
  ${({ theme }) =>
    css`
      color: ${theme.gray5};
      font-size: ${theme.font4};
      background: ${theme.gray2};
      margin-bottom: ${theme.s2};
      padding: ${theme.s2} ${theme.s2};
      border-radius: ${theme.br3};
      border: 2px solid ${theme.gray2};
      :hover,
      :focus {
        background: ${theme.gray1};
        border: 2px solid ${theme.gray5};
      }
    `}
`;

const SubmitBtn = styled.button`
  flex-grow: 0;
  border: none;
  font-weight: 700;
  transition: background 0.2s ease, transform 0.2s ease;
  outline: none;
  cursor: pointer;
  ${({ theme }) =>
    css`
      font-size: ${theme.font1};
      padding: ${theme.s4} ${theme.s6};
      background: ${theme.gray4};
      color: ${theme.gray1};
      border-radius: ${theme.br3};
      :hover {
        background: ${theme.gray5};
      }
      :active {
        background: ${theme.gray6};
      }
    `};
`;

const ExpenseForm = () => {
  const [expense, setExpense] = useState();

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  const inputChangeHandler = (e) => {
    if (+e.target.value || e.target.value === '') {
      setExpense(e.target.value);
    }
  };

  return (
    <Div>
      <Form onSubmit={formSubmitHandler}>
        <label>
          <Input
            type="text"
            min="0"
            value={expense || ''}
            onChange={inputChangeHandler}
          />
        </label>
        <SubmitBtn type="submit">ADD EXPENSE</SubmitBtn>
      </Form>
    </Div>
  );
};

export default ExpenseForm;
