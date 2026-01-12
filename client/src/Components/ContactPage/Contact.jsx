import './Contact.css'
import { FaUser,  FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Navbar from '../NavbarPage/Navbar'
import logo from '../../assets/contact.png'


export const Contact = () => {

  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    navigate('/home')
  };

  return (
    <div>
      <Navbar/>
      <div className='contact-container'>
        <img className="img-logo" src={logo} alt="" />
        <div className='contact-wrapper'>
        <form action=''>
          <h1>Contact Us</h1>
          <div className='input-box'>
            <input type='text' placeholder='Your email' required></input>
            <FaUser className='icon'/>
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Your message' required></input>
            <FaLock className='icon'/>
          </div>
          <button onClick={handleSubmit}>Send</button>
        </form>
        </div>
      </div>
    </div>
  )
}
