import React, { useState } from 'react'
import './Todo.css'
import axios from 'axios'
import SessionStorage from '../../../stores/sessionStore'


  function CreateTodo({ onAdd }) {

    const sessionStorageInstance = SessionStorage.getInstance();
    const projectData = sessionStorageInstance.getProjectData();

    const [task, setTask] = useState('')
    const handleBtnClick = () => {
      axios.post('http://localhost:2000/todo', {task: task, projectId: projectData._id})
      .then(res => {
        console.log("Successfully added!");
        onAdd()
      })
      .catch(e => console.log("CreateToDo error: ", e))
    }

    return (
      <div>
          <input className='todo-input' type="text" onChange={(e) => setTask(e.target.value)}/>
          <button className='todo-btn' onClick={handleBtnClick}>Add</button>
      </div>
    )
  }

export default CreateTodo