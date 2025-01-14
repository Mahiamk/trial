import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [isSuccess, setisSuccess] = useState(true)


  const handleLoginClick = async () => {
    const loginSuccess = username && password;
    if (loginSuccess) {
      setisSuccess(!isSuccess)

      navigate('/main');
    }
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      })
      const data = await response.json();
      if (data.authenticated)
        navigate('/main');
    } catch (error) {
      console.log(error);
      setisSuccess(false);
    }
  }

  const handleSignupClick = () => {
    navigate('/signup');
  }

  return (
    <div>
      <div className="login-container">
        <h1 className='login-text'> Welcome to DAILY-PULSE!!!!!</h1>
        <input className='input-fields' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username...' ></input>
        <input className='input-fields' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password...' ></input>
        <div className="login-button-container">
          <button className="login-buttons" id="login-button" onClick={handleLoginClick}>Log In</button>
          <button className="login-buttons" id="signup-button" onClick={handleSignupClick}>Sign Up</button>
        </div>
      </div>
      {!isSuccess && <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'red' }}>Login credentials not found</p>}
    </div>
  )
}

export default Login;