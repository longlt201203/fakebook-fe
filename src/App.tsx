import axios, { AxiosError } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {
  const [result, setResult] = useState<{ status: string, data: any }>({
    status: '',
    data: null
  });

  const loginData = {
    username: '',
    password: ''
  };

  async function handleLogin() {
    const baseUrl = "http://localhost:3000";

    try {
      let res = await axios.post(`${baseUrl}/auth/login-with-username-and-password`, loginData);
      res = await axios.get(`${baseUrl}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${res.data.accessToken}`
        }
      });
      
      setResult({
        status: 'success',
        data: res.data.username
      });
    } catch (err) {
      const errData = {
        status: 'error',
        data: { message: 'unknow error' }
      }

      if (err instanceof AxiosError) {
        errData.data.message = err.response?.data.message;
      }
      setResult(errData);
    }
  }

  return (
    <>
      <h1>Login</h1>
      {result.status == 'error' ? <p className='text-danger'>{result.data.message}</p> : result.status == 'success' ? <p className='text-success'>Successfully login as {result.data}</p> : ''}
      <form>
        <div className='form-group'>
          <label htmlFor="username">Username</label>
          <input type="text" name='username' id='username' onChange={(e) => {
            loginData.username = e.target.value;
          }} />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id='password' onChange={(e) => {
            loginData.password = e.target.value;
          }} />
        </div>
        <div className='form-group'>
          <button type='button' onClick={() => handleLogin()}>Login</button>
        </div>
      </form>
    </>
  )
}

export default App
