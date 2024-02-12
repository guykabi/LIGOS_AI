import React from 'react'
import styles from './empty.module.scss'
import PersonSvg from '../../public/assets/svg/person-waiting-01-left-svgrepo-com.svg'
import Image from 'next/image'

type EmpryProps = {
  message:string
}

const Empty = ({message}:EmpryProps) => {
  return (
    <div className={styles.emptyWrapper}>
      <Image
      style={{opacity:'0.7'}}
      width={250}
      height={250}
      alt='Empty'
      priority={true}
      src={PersonSvg}/>
      <p>
        {message}
      </p>
    </div>
  )
}

export default Empty