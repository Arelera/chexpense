import styled from 'styled-components';
import Date from './Date/Date';
import Expense from './Expense/Expense';
import NavMenu from './NavMenu/NavMenu';

const InnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = () => {
  return (
    <div>
      <InnerDiv>
        <Date />
        <NavMenu />
      </InnerDiv>
      <Expense />
    </div>
  );
};

export default Header;
