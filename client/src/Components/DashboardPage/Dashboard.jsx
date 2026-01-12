import React, {useState} from 'react'
import './Dashboard.css'
import { Flex, Button, Layout } from 'antd'
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import SideBar from './SideBar'
import DashHeader from './DashHeader'
import ChatContent from './Chat/ChatContent'
import MainContent from './Asset/MainContent'
import TodoList from './Todo/TodoList'
import MeetingsList from './Meetigs/MeetingsList'
import Services from './ServiceTools/Services'




function Dashboard() {

    const { Sider, Header, Content} = Layout
    const [collapsed, setCollapsed] = useState(false)
    const [selectedKey, setSelectedKey] = useState('1');


    const handleMenuClick = (key) => {
        setSelectedKey(key);
    };

    const renderSelectedComponent = (selectedKey) => {
        switch(selectedKey) {
            case '1':
                return <MainContent />;
            case '2':
                return <ChatContent/>;
            case '3':
                return <TodoList/>
            case '4':
                return <MeetingsList/>
            case '5':
                return <Services/>
            default:
                return null; // Render nothing if key doesn't match
        }
    }

    return (
        <Layout className='dash-layout'>
            <Sider 
                theme="light" 
                trigger={null} 
                collapsible 
                collapsed={collapsed} 
                className='sider'>
            <SideBar selectedKey={selectedKey} onMenuClick={handleMenuClick}/>
            <Button 
                type='text' 
                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/> }
                onClick={() => setCollapsed(!collapsed)} 
                className='sider-btn' 
            />

            </Sider>
            <Layout>
                <Header className='header'> <DashHeader/></Header>
                <Content className='content'>
                    <Flex gap="large">
                    {renderSelectedComponent(selectedKey)}  
                    </Flex>
                </Content>
            </Layout>
        </Layout>
    )
}

export default Dashboard