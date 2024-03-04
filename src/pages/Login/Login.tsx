import React, { useState, FormEvent } from 'react';
import './Login.css';
import { AuthService } from '../../services/auth.service';
import { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useCheckProfile } from '../../hooks/useCheckProfile';
import { MainLayout } from '../../layouts/MainLayout';

const Login: React.FC = () => {
  useCheckProfile({ reverse: true, redirect: "/profile" });

  const authService = AuthService.getInstance();

  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    authService.loginWithUsernameAndPassword({
      username: username,
      password: password
    })
      .then((data) => {
        window.localStorage.setItem("accessToken", data.accessToken);
        navigate('/profile');
      })
      .catch(err => {
        if (err instanceof AxiosError) {
          setErrorMessage(err.response?.data.message);
        } else {
          console.log(err);
          setErrorMessage("Unknow error!");
        }
      });
  };

  const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      authService.loginWithGoogle(credentialResponse.credential)
        .then((data) => {
          window.localStorage.setItem("accessToken", data.accessToken);
          navigate('/profile');
        })
        .catch(err => {
          if (err instanceof AxiosError) {
            setErrorMessage(err.response?.data.message);
          } else {
            console.log(err);
            setErrorMessage("Unknow error!");
          }
        });
    } else {
      setErrorMessage("Unknow ID Token!");
    }
  }

  return (
    <MainLayout>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          {/* <img src="/src/assets/favicon.webp" alt="Fakebook Logo" className="logo" /> */}
          {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="form-footer">
            <button type="submit">Log In</button>
            <div className="links">
              <a href="#">Forgot Password?</a>
              <Link to={"/register"}>
                Sign Up
              </Link>
            </div>
          </div>
        </form>
        <hr />
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => {
            console.log('login error')
          }}
        />
      </div>
    </MainLayout>
  );
}

export default Login;
