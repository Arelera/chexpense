import { useState } from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  position: relative;
  outline: none;
  transition: all 0.2s ease;
  ${({ theme }) =>
    css`
      background: none;
      border: 1px solid ${theme.gray2};
      border-radius: ${theme.br1};
      padding: ${theme.s1};
      margin: ${theme.s2} ${theme.s1};
      font-size: ${theme.font5};
      color: ${theme.gray4};
      :hover,
      :focus {
        border: 1px solid ${theme.gray4};
      }
    `}
`;

const DeleteBtn = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  cursor: pointer;
  border: none;
  transition: transform 0.25s ease;
  ${(props) =>
    css`
      background: ${props.theme.gray6};
      color: ${props.theme.gray2};
      border-radius: ${props.theme.br1};
      font-size: ${props.theme.font5};
      transform: scale(${props.clicked ? '1.05' : '0'});
    `}
`;

const ExpenseLi = ({ amount, deleteHandler }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <Button onFocus={() => setClicked(true)} onBlur={() => setClicked(false)}>
      {amount}
      <DeleteBtn clicked={clicked} onClick={deleteHandler}>
        X
      </DeleteBtn>
    </Button>
  );
};

export default ExpenseLi;
