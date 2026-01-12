import React from 'react'
import {Card, Flex } from 'antd'
import SessionStorage from '../../../stores/sessionStore';
import {MultiChatSocket, MultiChatWindow, useMultiChatLogic} from 'react-chat-engine-advanced'

function ChatContent() {
  const sessionStorageInstance = SessionStorage.getInstance();
  const user = sessionStorageInstance.getUserData()

  const chatProps = useMultiChatLogic(
    user.chatEngineProjectId,
    user.username,
    user.password,
  )

  return (
    <div style={{flex: 1}}>
        <Flex vertical >
           <Card style={{padding: '20px'}}>
              <div style={{height: '80vh'}}>
                <MultiChatSocket {...chatProps}/>
                <MultiChatWindow {...chatProps} style={{height: '80vh'}}/>
              </div>
            </Card>
       </Flex>
    </div> 
  )
}

export default ChatContent



