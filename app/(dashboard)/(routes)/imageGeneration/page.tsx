import React from 'react'
import global from '../routesGlobal.module.scss'
import styles from './imageGeneration.module.scss'
import Header from '@/components/Header/header'
import { IoImagesOutline} from 'react-icons/io5'
import { Cards } from '@/components/Card/constants'

const ImageGenerator = () => {

 const imageCard = Cards.find(c=> c.title.startsWith('Image'))

  return (
    <div className={global.globalServiceWrapper}>
      <Header
      title={imageCard?.title!}
      description={imageCard?.content!}
      icon={<IoImagesOutline size={30}/>}
      color={imageCard?.color}
      />
    </div>
  )
}

export default ImageGenerator
