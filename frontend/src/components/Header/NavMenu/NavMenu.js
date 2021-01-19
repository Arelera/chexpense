import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { deleteUser, logoutUser } from '../../../store/actions/user';

const Div = styled.div`
  position: relative;
  ${({ theme }) => css`
    padding: ${theme.s2};
  `};
`;

const ExpandDiv = styled.div`
  position: absolute;
`;

const ExpandBtn = styled.button`
  border: 1px solid transparent;
  cursor: pointer;
  transition: border 0.2s ease;
  ${({ theme }) =>
    css`
      font-size: ${theme.font1};
      background: ${theme.gray2};
      padding: ${theme.s1} ${theme.s2};
      border-radius: ${theme.br1};
      :hover {
        border-color: ${theme.gray5};
      }
    `};
`;

const Button = styled(ExpandBtn)`
  width: 100%;
`;

const NavMenu = () => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  return (
    <Div>
      <ExpandBtn onClick={() => setExpanded(!expanded)}>Menu</ExpandBtn>
      {expanded && (
        <ExpandDiv onBlur={() => setExpanded(false)}>
          <Button onClick={() => dispatch(logoutUser())}>Logout</Button>
          <Button onClick={() => dispatch(deleteUser())}>Delete Account</Button>
        </ExpandDiv>
      )}
    </Div>
  );
};

export default NavMenu;
