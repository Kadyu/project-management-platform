import './Login.css'
import { FaUser,  FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios'
import { message } from 'antd'
import SessionStorage from '../../stores/sessionStore';


export const Login = () => {

  const sessionStorageInstance = SessionStorage.getInstance();
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    axios.post("http://localhost:2000/login", {username, password})
    .then(result => {
        const { code, user } = result.data;
        if (code === "Success"){
          sessionStorageInstance.saveUserData(user);
          navigate('/home')
        } else {
          message.error(code)
        }
    })
    .catch(e => console.log("Login error: ", e))
  };

  const [username, getUsername] = useState()
  const [password, getPassword] = useState()

  return (
    <div>
        <div className='login-container'>
          <div className='wrapper'>
          <form action=''>
            <h1>Login</h1>
            <div className='input-box'>
              <input type='text' placeholder='username' required onChange={(e) => getUsername(e.target.value)}></input>
              <FaUser className='icon'/>
            </div>
            <div className='input-box'>
              <input type='password' placeholder='password' required onChange={(e) => getPassword(e.target.value)}></input>
              <FaLock className='icon'/>
            </div>
            <p className='register-text' onClick={() => navigate('/register')}> Do not have an account? Register</p>
            <button onClick={handleSubmit}>Submit</button>
          </form>
          </div>
        </div>
        
    </div>
  )
}
