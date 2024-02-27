import './App.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './utils/router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Env } from './utils/Env';

function App() {
  return (
    <GoogleOAuthProvider clientId={Env.GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  )
}

export default App
