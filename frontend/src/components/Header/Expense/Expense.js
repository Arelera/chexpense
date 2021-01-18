import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

const Div = styled.div`
  text-align: center;
`;

const Number = styled.p`
  display: inline-block;
  position: relative;
  max-width: 100%;
  overflow: hidden;
  white-space: pre-wrap;
  ${({ theme }) =>
    css`
      padding: ${theme.s5};
      font-size: clamp(${theme.font9}, 8vw, ${theme.font10});
      color: ${theme.gray5};
      ::after {
        content: '';
        position: absolute;
        height: 8px;
        width: 100%;
        background: ${theme.gray3};
        bottom: 12px;
        left: 0;
        border-radius: 10px;
      }
    `}
`;

const Expense = () => {
  const expenses = useSelector((state) => state.expenses);
  return (
    <Div>
      <Number>
        {Math.round(
          expenses?.reduce((acc, curr) => acc + parseFloat(curr.amount), 0) *
            100
        ) / 100 || 0}
        $
      </Number>
    </Div>
  );
};

export default Expense;
