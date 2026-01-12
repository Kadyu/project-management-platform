import React from 'react'
import { Avatar, Flex, Typography } from 'antd'
import Search from 'antd/es/input/Search'
import {MessageOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons'
import './Dashboard.css'
import SessionStorage from '../../stores/sessionStore';

function DashHeader() {

  const sessionStorageInstance = SessionStorage.getInstance();
  const user = sessionStorageInstance.getUserData()

  return (
    <div className='header-container'>
    <Flex align='center' justify='space-between'>
        <Typography.Title level={4} type='secondary'>
            Good to see you back, {user.name}!
        </Typography.Title>
        <Flex align='center' gap="3rem">
            <Search placeholder='Search Dashboard' allowClear/>
            <Flex align='center' gap="10px">
              <MessageOutlined className='header-icon'/>
              <NotificationOutlined className='header-icon'/>
              <Avatar icon={<UserOutlined/>} />
            </Flex>
        </Flex>
    </Flex>
    </div>
  )
}

export default DashHeader