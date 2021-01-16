import { render, screen, fireEvent } from '@testing-library/react';
import DatePicker from '../components/DatePicker/DatePicker';

describe('DatePicker', () => {
  render(<DatePicker />);
  test("Day doesn't go over 31 or under 1 on january", () => {
    const day = screen.getByPlaceholderText('day');
    const month = screen.getByPlaceholderText('month');

    fireEvent.change(month, { target: { value: 1 } });
    fireEvent.change(day, { target: { value: 40 } });
    fireEvent.focusOut(day);
    expect(day.value).toBe('31');

    fireEvent.change(day, { target: { value: 0 } });
    fireEvent.focusOut(day);
    expect(day.value).toBe('01');
  });
});
