import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DateInput from './DateInput';

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const Slash = styled.span`
  vertical-align: bottom;
  /* font-size: ${({ theme }) => theme.font4}; */
`;

const DatePicker = () => {
  const date = cleanDate(new Date());
  const [day, setDay] = useState(parseInt(date[2]));
  const [month, setMonth] = useState(parseInt(date[1]));
  const [year, setYear] = useState(parseInt(date[0]));
  const [maxDay, setMaxDay] = useState(31);

  useEffect(() => {
    if (+month && +year) {
      let [, , newMaxDay] = cleanDate(new Date(year, month, 0)); // this gives months length
      newMaxDay = parseInt(newMaxDay);
      setMaxDay(newMaxDay + 1);
      if (day > newMaxDay + 1) setDay(newMaxDay + 1);
    }
  }, [month, year]);

  return (
    <Div>
      <DateInput
        max={maxDay}
        min={1}
        setValue={(val) => setDay(val)}
        value={day}
        placeholder="day"
      />
      <Slash>/</Slash>
      <DateInput
        max={12}
        min={1}
        setValue={(val) => setMonth(val)}
        value={month}
        placeholder="month"
      />
      <Slash>/</Slash>
      <DateInput
        max={2100}
        min={2000}
        setValue={(val) => setYear(val)}
        value={year}
        placeholder="year"
      />
    </Div>
  );
};

const cleanDate = (date) => date.toISOString().slice(0, 10).split('-'); // returns [year, month, day]

export default DatePicker;
