import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import ExpenseForm from '../components/ExpenseForm/ExpenseForm';

describe('ExpenseForm', () => {
  test('Adding expense clears input', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );

    const input = getByPlaceholderText('expense');
    const button = getByText('ADD EXPENSE');
    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(button);
    expect(input.value).toBe('');
  });
});
