import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function App() {
  const [result, setResult] = useState<{ status: string, data: any }>({
    status: '',
    data: null
  });

  const data = {
    username: '',
    password: ''
  };

  

  function handleLogin() {
    axios
      .post("http://localhost:3000/auth/login", data)
      .then((data) => {
        setResult({
          status: 'success',
          data: data
        })
      })
      .catch(err => {

      });
  }

  return (
    <>
      <h1>Login</h1>
      <form>
        <div className='form-group'>
          <label htmlFor="username">Username</label>
          <input type="text" name='username' id='username' onChange={(e) => {
            data.username = e.target.value;
          }} />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id='password' onChange={(e) => {
            data.password = e.target.value;
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
