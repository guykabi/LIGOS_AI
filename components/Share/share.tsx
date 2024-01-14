'use client'

import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
 } from 'react-share';
import { usePathname } from 'next/navigation';

 type ShareProps = {
  shareUrl:string,
  title: string,
  imageUrl?:string
 }

const Share = ({shareUrl,title,imageUrl}:ShareProps) => {

const [ligosService,setLigosService]=useState<string>('') 
const pathname = usePathname()


useEffect(()=>{
    if(pathname.includes('image')){
      return setLigosService('Image')
    }
    else if(pathname.includes('video')){
      return setLigosService('Video')
    }
    else if(pathname.includes('music')){
      return setLigosService('Music')
    }
    
},[])


  return (
    <>
    <Head>
      <title>Generate {ligosService} using AI</title>
      <meta name='description' content={`Checkout this amazing ${ligosService.toLocaleLowerCase()} I made!`} />
      <link rel="ligos" href="/images/AI_LOGO.png" />
      <meta property='og:image' content={shareUrl} />
      <meta property='og:title' content={`Image preview: ${shareUrl}`} />

    </Head>
    <div 
    style={{width:'fitContent', height:'fitContent',position:'absolute', zIndex:'10', bottom:0}}>
      {/* Facebook Share Button */}
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={50}/>
      </FacebookShareButton>

      {/* Twitter Share Button */}
      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={50}/>
      </TwitterShareButton>

      {/* WhatsApp Share Button */}
      <WhatsappShareButton url={`http://${location.hostname}:${location.port}/imageGeneration`} title={title} separator=":: ">
        <WhatsappIcon size={50}/>
      </WhatsappShareButton>
    </div>
    </>
  )
}

export default Share