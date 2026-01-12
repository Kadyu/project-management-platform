import React, {useState, useEffect} from 'react'
import {Card, Typography, Flex} from 'antd'
import CreateTodo from './CreateTodo'
import './Todo.css'
import axios from 'axios'
import { IoMdTrash } from "react-icons/io";
import SessionStorage from '../../../stores/sessionStore'

function TodoList() {

    const sessionStorageInstance = SessionStorage.getInstance();
    const projectData = sessionStorageInstance.getProjectData();


    const [todos, setTodos] = useState([])
    useEffect(()=>{
        loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const loadTodos = () => {
        axios.get('http://localhost:2000/todos', { params: { projectId: projectData._id } })
        .then(result => {
            setTodos(result.data);
        })
        .catch(e => console.log("TodoList error: ", e));
    };

    const handleAddTodo = () => {
        loadTodos();
    };

    const handleDelete = (task) => {
        axios.post('http://localhost:2000/todos/delete', {task: task, projectId: projectData._id})
            .then(res => {
                setTodos(res.data.todos)
            })
            .catch(e => console.log("Delete Todo error: ", e))
    }


    return (
        <div className='todo-container'>
        <Flex>
            <Card style={{ padding: '20px', marginLeft: '220px'}}>
                <Flex className='todo-inner' vertical gap='30px' align='center' justify='center'>
                    <Flex vertical align='center'>
                        <Typography.Title level={2} strong>
                            Project Scheduler
                        </Typography.Title>
                        <CreateTodo onAdd={handleAddTodo}/>
                        {
                            todos.length === 0 ? 
                            <Typography.Text type='primary' strong> No record </Typography.Text> : 
                            todos.map((todo, index) => (
                                <div key={index} className='todo-task'> {todo} <IoMdTrash className='todo-icon' onClick={()=>handleDelete(todo)}/> </div>
                            )) 
                        }
                    </Flex>
                </Flex>
            </Card>
        </Flex>
        </div>
    )
}

export default TodoList