import React from 'react'
import global from '../routesGlobal.module.scss'
import { Cards } from '@/components/Card/constants'
import { FiMusic } from "react-icons/fi";
import Header from '@/components/Header/header';
import MusicForm from '@/components/MusicForm/musicForm';
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Music Generation',
};


const Music = () => {

  const musicCard = Cards.find(c=> c.title.startsWith('Music'))

  return (
    <div className={global.globalServiceWrapper}>
      <Header
      title={musicCard?.title!}
      description={musicCard?.content!}
      icon={<FiMusic size={30}/>}
      color={musicCard?.color}
      />
      <MusicForm/>
    </div>
  )
}

export default Music
