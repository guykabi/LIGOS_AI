import React, { useEffect } from 'react'
import global from '../routesGlobal.module.scss'
import Header from '@/components/Header/header'
import {IoChatbubblesOutline} from 'react-icons/io5'
import ChatForm from '@/components/ChatForm/chatForm'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Chat Generation',
};

const Chat = () => {
  return (

    <div className={global.globalServiceWrapper}>
      <Header  
      title='Chat' 
      description='Ask any question you like'
      icon={<IoChatbubblesOutline size={30}/>}
      color='blue'
      /> 
      <ChatForm/>
    </div>
  )
}

export default Chat
