import React from 'react'
import { Flex, Menu} from 'antd'
import {IoIosBook} from "react-icons/io";
import './Dashboard.css'
import { useNavigate } from 'react-router-dom';
import { IoMdChatbubbles } from "react-icons/io";
import { PiFoldersFill } from "react-icons/pi";
import { SiGooglemeet } from "react-icons/si";
import { MdDesignServices } from "react-icons/md";
import { LogoutOutlined, OrderedListOutlined } from '@ant-design/icons'
import SessionStorage from '../../stores/sessionStore';

function SideBar({ selectedKey, onMenuClick }) {

    const navigate = useNavigate()
    const sessionStorageInstance = SessionStorage.getInstance();

    const handleMenuClick = (key) => {
        if (key === '6'){
            sessionStorageInstance.clearProjectData();
            navigate("/home")
        } else{
            onMenuClick(key)
        }
    }

  return (
    <div className='sidebar-container'>
        <Flex className='flex-sider' align='center' justify='center'>
            <div className="sidebar-logo">
                <IoIosBook/>
            </div>
        </Flex>
        <Menu mode='inline' defaultSelectedKeys={[selectedKey]} className='menu-bar' onClick={({ key }) => handleMenuClick(key)} items={[
            {
                key : '1',
                icon: <PiFoldersFill />,
                label: 'Assets',
            },
            {
                key : '2',
                icon: <IoMdChatbubbles />,
                label: 'Chat',
            },
            {
                key : '3',
                icon: <OrderedListOutlined/>,
                label: 'Tasks',
            },
            {
                key : '4',
                icon: <SiGooglemeet />,
                label: 'Meetings',
            },
            {
                key : '5',
                icon: <MdDesignServices />,
                label: 'Services',
            },
            {
                key : '6',
                icon: <LogoutOutlined/>,
                label: 'Exit',
            }
        ]}/>
    </div>
  )
}

export default SideBar