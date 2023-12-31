import React from 'react'
import styles from './header.module.scss'

type HeaderProps = {
  title:string 
  description?:string 
  icon?:any,
  color?:string
}

const Header = ({title,description,icon,color}:HeaderProps) => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerIcon} style={{color:`${color}`}}>
        {icon}
      </div>
      <div className={styles.textHeader}>
        <h2>
         {title}
        </h2>
        <p>
          {description}
        </p>
      </div>
    </div>
  )
}

export default Header