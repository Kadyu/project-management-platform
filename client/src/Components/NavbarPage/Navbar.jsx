import React, {useState} from 'react'
import './Navbar.css'
import { FaUniversity} from "react-icons/fa";
import {useNavigate } from 'react-router-dom';
import { Modal, Typography, message } from 'antd';
import SessionStorage from '../../stores/sessionStore';
import axios from 'axios'
import { IoMdLogOut } from "react-icons/io";



function Navbar() {

  const navigate = useNavigate()
  const [isModalOpen, showModal] = useState(false)
  const [userInput, setInput] = useState('')

  const sessionStorageInstance = SessionStorage.getInstance();
  const user = sessionStorageInstance.getUserData()

  const handleOk = () => {
    axios.post('http://localhost:2000/project/add', {projectId: userInput, userId: user._id})
    .then(response => {
      if (response.data === 'Success'){
        message.success(response.data)
        showModal(false)
      }
      else{
        message.error(response.data)
      }
    })
    .catch(e => console.log("project/add error: ", e))
  }

  const handleLogOut = () => {
    sessionStorageInstance.clearUserData()
    sessionStorageInstance.clearProjectData()
    message.info('You have logged out!')
    navigate('/')
  } 

  return (
    <nav className='navbar-container'>
        <FaUniversity className="navbar-logo"/>
        <ul>
            <li onClick={() => navigate('/home')}> Home</li>
            <li onClick={() => navigate('/projects')}>Projects</li>
            <li onClick={() => showModal(true)}>Join</li>
            <li onClick={() => navigate('/contact')}> Contact us</li>
            <li> <button className='nav-btn' onClick={() => navigate('/create')} >Create a project</button> </li>
            <li onClick={handleLogOut}><IoMdLogOut /></li>
        </ul>

        <Modal className='join-modal' title="Join the project" open={isModalOpen} onOk={handleOk} onCancel={() => showModal(false)} okText="Confirm" cancelText="Cancel" centered>
          <Typography.Text type='secondary' strong>
              Please, insert the project ID to join the group!
          </Typography.Text>
          <input type='text' placeholder='username' required onChange={(e) => setInput(e.target.value)}></input>
        </Modal>
    </nav>
  )
}

export default Navbar