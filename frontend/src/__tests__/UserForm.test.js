import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import UserForm from '../components/UserForm/UserForm';
import store from '../store/store';

describe('UserForm', () => {
  test('Switching forms clears input fields', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <UserForm />
      </Provider>
    );
    const username = getByPlaceholderText('Username');
    const switchBtn = getByText("Don't have an account? Signup");
    fireEvent.change(username, { target: { value: 'Someusername' } });
    expect(username.value).toBe('Someusername');
    fireEvent.click(switchBtn);
    expect(username.value).toBeFalsy();
  });
});
