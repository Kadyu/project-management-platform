import React from 'react'
import {Card, Typography, Flex, Button} from 'antd'
import './MainContent.css'
import SessionStorage from '../../../stores/sessionStore'


function MainContent() {

    const sessionStorageInstance = SessionStorage.getInstance();
    const projectData = sessionStorageInstance.getProjectData();

    const handleButtonClick = (val) => {
        if (val === 1){
            window.open(projectData.googleLink)
        }
        else{
            window.open(projectData.whatsappLink)
        }
    }

    return (
        <div className='maincontent-container'>
            <Card style={{height:260, padding: '20px'}} >
                <Flex vertical gap='50px'>
                    <Flex vertical align='flex-start'>
                        <Typography.Title level={2} strong>
                        Google Docs
                        </Typography.Title>
                        <Typography.Text type='secondary' strong>
                            The documents can be easily shared among the project participant and anyone will be able to access it in one click.
                            There you and your teammates can store all the neccesary files and documents needed for competion of the project.
                        </Typography.Text>
                    </Flex>
                    <Flex gap='large'>
                        <Button type='primary' size='large' onClick={() => handleButtonClick(1)}>Go to Google Docs</Button>
                    </Flex>
                </Flex>
            </Card>

            <Card style={{height:260, padding: '20px', marginTop: '40px'}}>
                <Flex vertical gap='50px'>
                    <Flex vertical align='flex-start'>
                        <Typography.Title level={2} strong>
                        Communication Channels
                        </Typography.Title>
                        <Typography.Text type='secondary' strong>
                            Communication channels suppport your connection with other parties of this project.
                            By passing the required links in the registration form, you and all your teammates can access the preferred way of communication.
                            Stay in touch and see you there!
                        </Typography.Text>
                    </Flex>
                    <Flex gap='large'>
                        <Button type='primary' size='large' onClick={() => handleButtonClick(2)}>Go to communication channel</Button>
                    </Flex>
                </Flex>
            </Card>
        </div>
    )
}

export default MainContent