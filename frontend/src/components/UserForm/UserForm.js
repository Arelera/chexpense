import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { loginUser, signupUser } from '../../store/actions/user';

const Div = styled.div`
  margin: 0 auto;
  max-width: 400px;
  padding: ${({ theme }) => `${theme.s8} ${theme.s7}`};
`;

const Title = styled.h1`
  ${({ theme }) =>
    css`
      font-size: ${theme.font5};
      color: ${theme.gray6};
      margin-bottom: ${theme.s6};
    `}
`;

const Form = styled.form``;

const LabelText = styled.span`
  ${({ theme }) =>
    css`
      font-size: ${theme.font3};
    `}
`;

const TextInput = styled.input`
  width: 100%;
  outline: none;
  transition: background 0.2s ease, border 0.2s ease;
  ${({ theme }) =>
    css`
      margin: ${theme.s1} 0 ${theme.s4};
      padding: ${theme.s1} ${theme.s2};
      border: 2px solid transparent;
      background: ${theme.gray2};
      border-radius: ${theme.br1};
      :hover,
      :focus {
        background: ${theme.gray1};
        border-color: ${theme.gray4};
      }
      :focus {
        border-color: ${theme.gray5};
      }
    `}
`;

const Buttons = styled.div`
  margin-top: ${({ theme }) => theme.s2};
`;

const SubmitBtn = styled.button`
  border: none;
  font-weight: 700;

  ${({ theme }) =>
    css`
      background: ${theme.gray2};
      padding: ${theme.s2} ${theme.s4};
      border-radius: ${theme.br2};
      color: ${theme.gray6};
    `}
`;

const SwitchBtn = styled.button`
  border: none;
  background: none;
  ${({ theme }) =>
    css`
      color: ${theme.gray4};
      font-size: ${theme.font1};
      margin-left: ${theme.s2};
      :hover {
        color: ${theme.gray6};
      }
    `}
`;

const Error = styled.p`
  text-align: center;
  ${({ theme }) =>
    css`
      color: ${theme.gray6};
      font-size: ${theme.font1};
    `}
`;

const UserForm = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState('');

  const switchHandler = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setPassword('');
    setPasswordRepeat('');
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setError('');
    if (isLogin) {
      dispatch(loginUser({ username, password }));
    } else {
      if (password !== passwordRepeat) {
        return setError('Please enter matching passwords');
      }
      dispatch(signupUser({ username, password, passwordRepeat })).then(
        (res) => {
          if (res) {
            setError(res.error);
          }
        }
      );
    }
  };

  return (
    <Div>
      {isLogin ? (
        <form onSubmit={formSubmitHandler}>
          <Title>Login to Chexpense</Title>
          <label>
            <LabelText>Username</LabelText>
            <TextInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </label>
          <label>
            <LabelText>Password</LabelText>
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </label>
          <p>{error}</p>
          <Buttons>
            <SubmitBtn type="submit">LOGIN</SubmitBtn>
            <SwitchBtn type="button" onClick={switchHandler}>
              Don't have an account? Signup
            </SwitchBtn>
          </Buttons>
        </form>
      ) : (
        <form onSubmit={formSubmitHandler}>
          <Title>Signup to Chexpense</Title>
          <label>
            <LabelText>Username</LabelText>
            <TextInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </label>
          <label>
            <LabelText>Password</LabelText>
            <TextInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </label>
          <label>
            <LabelText>Repeat password</LabelText>
            <TextInput
              type="password"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              placeholder="Repeat password"
            />
          </label>
          <Error>{error}</Error>
          <Buttons>
            <SubmitBtn type="submit">SIGNUP</SubmitBtn>
            <SwitchBtn type="button" onClick={switchHandler}>
              Already have an account? Login
            </SwitchBtn>
          </Buttons>
        </form>
      )}
    </Div>
  );
};

export default UserForm;
