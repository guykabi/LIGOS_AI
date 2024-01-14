import React from 'react'
import global from '../routesGlobal.module.scss'
import styles from './video.module.scss'
import Header from '@/components/Header/header'
import { Cards } from '@/components/Card/constants'
import {IoVideocamOutline} from 'react-icons/io5'
import VideoForm from '@/components/VideoForm/videoForm'

const VideoGenerator = () => {
  const videoCard = Cards.find(c=> c.title.startsWith('Video'))

  return (
    <div className={global.globalServiceWrapper}>
      <Header
      title={videoCard?.title!}
      description={videoCard?.content!}
      icon={<IoVideocamOutline size={30}/>}
      color={videoCard?.color}
      />

      <VideoForm/>
    </div>
  )
}

export default VideoGenerator
