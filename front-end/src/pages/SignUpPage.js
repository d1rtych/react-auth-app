import axios from "axios";

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToken } from "../auth/useToken";

export const SignUpPage = () => {
  const [, setToken] = useToken();
  const [errorMessage, ] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
  const history = useHistory();

  const onSingUpClicked = async () => {
    const response = await axios.post('/api/signup', {
      email: emailValue,
      password: passwordValue,
    });
    const { token } = response.data;

    setToken(token);
    history.push(`/please-verify?email=${encodeURIComponent(emailValue)}`);
  }

  return (
    <div className='content-container'>
      <h1>Sign Up</h1>
      {errorMessage && <div className='fail'>{errorMessage}</div>}
      <input
        type="text"
        placeholder='expample@email.com'
        value={emailValue}
        onChange={e => setEmailValue(e.target.value)}
      />
      <input
        type="password"
        placeholder='password'
        value={passwordValue}
        onChange={e => setPasswordValue(e.target.value)}
      />
      <input
        type="password"
        placeholder='confirm password'
        value={confirmPasswordValue}
        onChange={e => setConfirmPasswordValue(e.target.value)}
      />
      <hr/>
      <button
        disabled={!emailValue || !passwordValue || passwordValue !== confirmPasswordValue}
        onClick={onSingUpClicked}
      >Sign Up</button>
      <button onClick={() => history.push('/login')}>Already have an account? Log In</button>
    </div>
  );
};
