import React, { useState } from 'react'
import './Create.css'
import { MdDescription } from "react-icons/md";
import { GoProject } from "react-icons/go";
import { FaWhatsapp, FaGoogleDrive } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Navbar from '../NavbarPage/Navbar'
import axios from 'axios'
import SessionStorage from '../../stores/sessionStore';



export const Create = () => {

  const navigate = useNavigate()
  const sessionStorageInstance = SessionStorage.getInstance();
  const user = sessionStorageInstance.getUserData()

  const [projectName, setProjectName] = useState()
  const [projectDesc, setProjectDesc] = useState()
  const [whatsappLink, setWhatsappLink] = useState()
  const [googleLink, setGooglelink] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post("http://localhost:2000/create", {
      projectName, projectDesc, whatsappLink, googleLink, projectUsers: [user._id] 
    })
    .then(result => {
      console.log(result);
      navigate('/projects')
    })
    .catch(e => console.log("Create error: ", e))
    
  }

  return (
    <div>
    <Navbar/>
        <div className='create-container'>
          <div className='wrapper'>
          <form action=''>
            <h2>Start your journey!</h2>
            <div className='input-box'>
              <input type='text' placeholder='Project name' required onChange={(e) => setProjectName(e.target.value)}></input>
              <GoProject className='icon'/>
            </div>
            <div className='input-box'>
              <input type='text' placeholder='Short description' required onChange={(e) => setProjectDesc(e.target.value)}></input>
              <MdDescription className='icon'/>
            </div>
            <div className='input-box'>
              <input type='text' placeholder='WhatsApp/Discord link' required onChange={(e) => setWhatsappLink(e.target.value)}></input>
              <FaWhatsapp className='icon'/>
            </div>
            <div className='input-box'>
              <input type='text' placeholder='Google Disk link' required onChange={(e) => setGooglelink(e.target.value)}></input>
              <FaGoogleDrive className='icon'/>
            </div>
            <button onClick={handleSubmit}>Create Project</button>
          </form>
          </div>
        </div>
        
    </div>
  )
}
