import React from 'react';
import './Card.css';
import { useNavigate } from 'react-router-dom';
import SessionStorage from '../../stores/sessionStore';
import axios from 'axios'
import {message} from 'antd'

function Card({cards, onDelete}) {

  const cardsInfo = cards;
  const navigate = useNavigate()
  const sessionStorageInstance = SessionStorage.getInstance();
  const user = sessionStorageInstance.getUserData()

  const handleSubmit = (event, card) => {
    event.preventDefault()
    sessionStorageInstance.saveProjectData(card);
    navigate('/dashboard')
  }

  const handleLeave = (event, card) => {
    event.preventDefault();
    axios.post('http://localhost:2000/project/remove', {projectId: card._id, userId: user._id})
    .then(response => {
      if (response.data === 'Success'){
        message.success(response.data)
        onDelete();
      }
      else{
        message.error(response.data)
      }
    })
    .catch(e => console.log("project/remove: ", e))

  }

  return (
    <section>
      <div className='cards-container'>
        <h1>My projects</h1>
        {cardsInfo.length === 0 ? (
          <h2 className='no-cards-text'> Unfortunately, you have no projects right now </h2>
        ) : (
            <div className='cards'>
            {
              cardsInfo.map((card, i) => (
                <div key={i} className='card'> 
                  <h2> {card.projectName}</h2>
                  <p> <b>Project ID: </b> {card._id}</p>
                  <p> <b>Number of students: </b> {card.projectUsers.length}</p>
                  <br />
                  <p> <b>Title</b> {card.projectDesc}</p>
                  <button className='btn-card' onClick={(event) => handleSubmit(event, card)}> <b>Go to project</b></button>
                  <button className='btn-card-leave' onClick={(event) => handleLeave(event, card)}> <b>Leave</b> </button>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Card;
