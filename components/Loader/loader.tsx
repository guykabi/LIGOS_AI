import React from 'react'
import Image from 'next/image'
import styles from './loader.module.scss'

type LoaderProps = {
  text?:string
}

const Loader = ({text = 'Loading...'}:LoaderProps) => {
  return (
    <div className={styles.loader}>
      <div className={styles.loadingImageWrapper}>
        <Image
        width={55}
        height={55}
        alt='Ligos'
        src={'/images/AI_LOGO.png'}
        />
      </div>
      <p>
        {text}
      </p>
    </div>
  )
}

export default Loader