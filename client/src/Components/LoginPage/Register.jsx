import './Login.css'
import { FaUser,  FaLock, FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import { MdOutlineEmail } from "react-icons/md";


export const Register = () => {

  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault(); 
    axios.post("http://localhost:2000/register", {name, email, username, password})
    .then(result => {
        console.log(result)
        navigate('/')
    })
    .catch(e => console.log("Register error: ", e))
  };

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  return (
    <div>
        <div className='login-container'>
          <div className='wrapper'>
          <form action=''>
            <h1>First time here?</h1>
            <div className='input-box'>
              <input type='text' placeholder='full name' required onChange={(e) => setName(e.target.value)}></input>
              <FaUser className='icon'/>
            </div>
            <div className='input-box'>
              <input type='text' placeholder='email' required onChange={(e) => setEmail(e.target.value)}></input>
              <MdOutlineEmail className='icon'/>
            </div>
            <div className='input-box'>
              <input type='text' placeholder='username' required onChange={(e) => setUsername(e.target.value)}></input>
              <FaUserCircle className='icon'/>
            </div>
            <div className='input-box'>
              <input type='password' placeholder='password' required onChange={(e) => setPassword(e.target.value)}></input>
              <FaLock className='icon'/>
            </div>
            <div className='input-box'>
              <input type='password' placeholder='re-enter password' required></input>
              <FaLock className='icon'/>
            </div>
            <button onClick={handleSubmit}>Register</button>
          </form>
          </div>
        </div>
        
    </div>
  )
}
