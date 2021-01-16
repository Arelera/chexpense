import styled, { css } from 'styled-components';

const Div = styled.div`
  text-align: center;
`;

const Number = styled.p`
  display: inline-block;
  font-weight: 400;
  position: relative;
  ${({ theme }) =>
    css`
      padding: ${theme.s5};
      font-size: ${theme.font10};
      color: ${theme.gray5};
      ::after {
        content: '';
        position: absolute;
        height: 8px;
        width: 100%;
        background: ${theme.gray3};
        bottom: 22px;
        left: 0;
        border-radius: 10px;
      }
    `}
`;

const Expense = ({ expense }) => {
  return (
    <Div>
      <Number>{expense}$</Number>
    </Div>
  );
};

export default Expense;
