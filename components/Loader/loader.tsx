import React from 'react'
import Image from 'next/image'
import styles from './loader.module.scss'

const Loader = () => {
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
        Ligos is loading...
      </p>
    </div>
  )
}

export default Loader