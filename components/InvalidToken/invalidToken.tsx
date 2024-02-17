import React from 'react'
import styles from './invalidToken.module.scss'
import Button from '../Button/Button'
import Link from 'next/link'

const InvalidToken = () => {
  return (
    <div className={styles.main}>
      <h2>
        Your token is invalid or expired . Try again
      </h2>
      <div>
        <Link href={'/'}>
          <Button text='Return' theme='purple'/>
        </Link>
      </div>
    </div>
  )
}

export default InvalidToken