import React from 'react'
import styles from './video.module.scss'
import Image from 'next/image'

type VideoProps = {
  src:string
}
const Video = ({src}:VideoProps) => {
  
  return (
    <div className={styles.videoWrapper}>
    <div className={styles.senderIcon}>
      <Image width={20} height={20} alt="Ligos" src="/images/AI_LOGO.png" />
    </div>
    <div className={styles.content}>
      <video controls>
        <source src={src} />
      </video>
    </div>
  </div>
  )
}

export default Video