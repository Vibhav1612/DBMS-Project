import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

console.log('In register');

function Register() {
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [usernameLogin, setUsernameLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();

  const register = () => {
    axios.post('http://localhost:4400/register', {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
  
      // Ensure that 'userId' is present in the response
      const userId = response.data.userId;

  
      if (userId !== undefined) {
        // console.log('In this', userId)
        // Redirect to '/user_id/register_clubs' after successful registration
        navigate(`/${userId}/register_clubs`);
      } else {
        console.error("User ID not found in the response.");
      }
    }).catch((error) => {
      console.error("Error during registration:", error);
    });
  };
  

  const login = () => {
    axios.post('http://localhost:4400/register', {
      username: usernameLogin,
      password: passwordLogin,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].email);
        // Redirect to '/' after successful login
        // navigate(`/${userId}`);
      }
    });
  };

  return (
    <div className="App">
      <div className="Registration">
        <h1>REGISTRATION</h1>
        <label>Username</label>
        <input type="text" value={usernameReg} onChange={(event) => setUsernameReg(event.target.value)} />

        <label>Password</label>
        <input type="password" value={passwordReg} onChange={(event) => setPasswordReg(event.target.value)} />

        <button onClick={register}>Register</button>
      </div>

      <div className="Login">
        <h1>Login</h1>
        <input type="text" placeholder="Username" value={usernameLogin} onChange={(event) => setUsernameLogin(event.target.value)} />
        <input type="password" placeholder="Password" value={passwordLogin} onChange={(event) => setPasswordLogin(event.target.value)} />
        <button onClick={login}>Login</button>
      </div>

      <h1>{loginStatus}</h1>
    </div>
  );
}

export default Register;
