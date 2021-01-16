import styled, { css } from 'styled-components';
import DatePicker from '../../DatePicker/DatePicker';

const Div = styled.div`
  ${({ theme }) =>
    css`
      font-size: ${theme.font3};
      color: ${theme.gray4};
      padding: ${theme.s2};
    `}
`;

const TimePeriod = styled.p`
  ${({ theme }) =>
    css`
      margin-bottom: ${theme.s1};
    `};
`;

const Date = () => {
  return (
    <Div>
      <TimePeriod>Today</TimePeriod>
      <DatePicker />
    </Div>
  );
};

export default Date;
