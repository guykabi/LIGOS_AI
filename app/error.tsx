'use client' 
 
import { useEffect } from 'react'
import styles from './error.module.scss'
import Button from '@/components/Button/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className={styles.mainErrorWrapper}>
      <div className={styles.text}>
          <h2>{error.message}</h2>
          <Button
          text='Try Again'
          onClick={reset}
          theme='purple'
          />
      </div>
    </div>
  )
}