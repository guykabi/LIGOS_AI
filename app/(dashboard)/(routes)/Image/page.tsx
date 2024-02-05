import React from 'react'
import global from '../routesGlobal.module.scss'
import Header from '@/components/Header/header'
import { IoImagesOutline} from 'react-icons/io5'
import { Cards } from '@/components/Card/constants'
import ImageForm from '@/components/ImageForm/imageForm'
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Image Generation',
};

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
      <ImageForm/>
    </div>
  )
}

export default ImageGenerator
