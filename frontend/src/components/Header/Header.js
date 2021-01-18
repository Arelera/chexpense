import styled from 'styled-components';
import Date from './Date/Date';
import Expense from './Expense/Expense';

const Div = styled.div``;

const Header = () => {
  return (
    <Div>
      <Date />
      <Expense />
    </Div>
  );
};

export default Header;
