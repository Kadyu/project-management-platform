import React, { useState } from 'react'
import axios from 'axios'
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import './Meetings.css'
import SessionStorage from '../../../stores/sessionStore'

function CreateMeeting({onAdd}) {

    const sessionStorageInstance = SessionStorage.getInstance();
    const projectData = sessionStorageInstance.getProjectData();

    const [name, setName] = useState('')
    const [link, setLink] = useState('')
    const [time, setTime] = useState(new Date())
    const handleBtnClick = () => {
        const options = { month: 'numeric', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        const formatDate = time.toLocaleString('en-US', options);
        console.log(time , " *** " ,formatDate);
        axios.post('http://localhost:2000/meeting', 
        {
            name: name, 
            projectId: projectData._id,
            link: link,
            time: formatDate
        })
        .then(res => {
            console.log("Successfully added meeting!", res);
            onAdd()
        })
        .catch(e => console.log("Create Meeting error: ", e))
    }

    return (
        <div>
            <input className='meeting-input' placeholder='Meetings description' type="text" onChange={(e) => setName(e.target.value)}/>
            <input className='meeting-input' placeholder='Link' type="text" onChange={(e) => setLink(e.target.value)}/>
            <DateTimePicker style={{border:'none'}} format='y-MM-dd, HH:mm' value={time} disableClock onChange={(e) => setTime(e)}/>
            <button className='meeting-btn' onClick={handleBtnClick}>Add</button>
        </div>

      
    )
}

export default CreateMeeting