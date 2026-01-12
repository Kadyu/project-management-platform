import React from 'react'
import Navbar from '../NavbarPage/Navbar'
import './Home.css'

function Home() {

  return (
    <div>
    <Navbar/>
      <div className='home-container'>
        <div className='home-text'>
          <h1>Project management platform</h1>
          <p>
          This platform aims to enhance students' productivity and management capabilities during the 
          group project assessments by providing all the necessary tools in one single application with 
          additional functionalities of artificial intelligence, machine learning, integrated services and 
          APIs, and a user-friendly interface
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home