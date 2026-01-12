import React, {useState, useEffect} from 'react'
import {Card, Typography, Flex} from 'antd'
import CreateMeeting from './CreateMeeting'
import axios from 'axios'
import { IoMdTrash } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import './Meetings.css'
import SessionStorage from '../../../stores/sessionStore'

function MeetingsList() {

    const sessionStorageInstance = SessionStorage.getInstance();
    const projectData = sessionStorageInstance.getProjectData();
    
    const [meetings, setTodos] = useState([])
    useEffect(()=>{
        loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const loadTodos = () => {
        axios.get('http://localhost:2000/meetings', { params: { projectId: projectData._id } })
        .then(result => {
            setTodos(result.data);
        })
        .catch(e => console.log("TodoList error: ", e));
    };

    const handleAddTodo = () => {
        loadTodos();
    };

    const handleDelete = (meeting) => {
        axios.post('http://localhost:2000/meeting/delete', {name: meeting.name, projectId: projectData._id})
            .then(res => {
                console.log("Successfully deleted meeting: ", res);
                loadTodos();
            })
            .catch(e => console.log("Delete Todo error: ", e))
    }

    const handleLinkClick = (link) => {
        window.open(link)
    }

    return (
        <div className='meeting-container'>
            <Card style={{ padding: '20px', paddingBottom: '95px', marginLeft: '240px'}}>
                <Flex vertical gap='30px' align='center' justify='center'>
                    <Flex vertical align='center'>
                        <Typography.Title level={2} color='white' strong>
                            Meetings reminder
                        </Typography.Title>
                        <CreateMeeting onAdd={handleAddTodo}/>
                        {
                            meetings.length === 0 ? 
                            <Typography.Text type='primary' strong> No meetings </Typography.Text> :
                            meetings.map((meeting, index) => (
                                <div  className='meeting-task' style={{display: 'flex'}}>
                                    <span className='meeting-row' key={index} > {meeting.name}</span>
                                    <span className='meeting-row'> {meeting.link } &nbsp; &nbsp;<FaExternalLinkAlt className='meetinglink-icon' onClick={()=>handleLinkClick(meeting.link)}/> </span>
                                    <span className='meeting-row'> {meeting.time} </span>
                                    <IoMdTrash className='meeting-icon' onClick={()=>handleDelete(meeting)}/>
                                </div>
                            )) 
                        }
                    </Flex>
                </Flex>
            </Card>
        </div>
    )
}

export default MeetingsList