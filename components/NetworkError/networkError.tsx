import React from 'react'
import styles from './networkError.module.scss'
import { FiWifiOff } from "react-icons/fi";


const NetworkError = () => {
  return (
    <div
    role="alert"
    aria-describedby="An alert on no internet connection"
     className={styles.newWorkErrorWrapper}>
      <h2>You are offline, <br/> check your connection !</h2>
      <p>
        <FiWifiOff size={30}/>
      </p>
    </div>
  )
}

export default NetworkError