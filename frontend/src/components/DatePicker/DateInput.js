import styled, { css } from 'styled-components';

const Span = styled.span`
  display: flex;
  flex-direction: column;
  width: 24px;

  :first-child {
  }
  :last-child {
    width: 40px;
  }
`;

const Input = styled.input`
  box-sizing: border-box;
  text-align: center;
  font-size: 1rem;
  width: 100%;
  transition: border 0.2s ease;
  border: 1px solid transparent;
  outline: none;
  ${({ theme }) =>
    css`
      color: ${theme.gray5};
      font-weight: 500;
      font-size: ${theme.font2};
      background: ${theme.gray1};
      :hover,
      :focus {
        border-bottom: 1px solid ${theme.gray4};
      }
    `}
`;

const DateInput = ({ min, max, setValue, value, placeholder }) => {
  const valueChangeHandler = (val) => {
    const newVal = `${val}`.length > `${max}`.length ? `${val}`.slice(1) : val;
    if (newVal <= max && newVal > min) setValue(newVal);
    else if (newVal && newVal > max) setValue(max);
    else setValue(min);
  };

  return (
    <Span>
      <Input
        type="text"
        value={`${value}`.length === 1 ? `0${value}` : value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => valueChangeHandler(e.target.value)}
        placeholder={placeholder}
      />
    </Span>
  );
};

export default DateInput;
