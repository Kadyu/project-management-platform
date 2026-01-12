import React, { useState, useEffect } from 'react';
import './Projects.css'
import Navbar from '../NavbarPage/Navbar'
import SessionStorage from '../../stores/sessionStore';
import Card from './Card'
import axios from 'axios'

function Projects() {
  const [cards, setCards] = useState([]);
  const sessionStorageInstance = SessionStorage.getInstance();
  const user = sessionStorageInstance.getUserData()

  const loadProjects = () => {
    axios.get("http://localhost:2000/projects", { params: { userId: user._id } })
      .then(res => {
        setCards([...res.data])
      })
    .catch(e => console.log("Projects error: ", e))
  }

  useEffect(() => {
    loadProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <div>
      <Navbar/>
      <div className='projects-container'>
        <Card cards={cards} onDelete={loadProjects}/>
      </div>
    </div>
  )
}

export default Projects