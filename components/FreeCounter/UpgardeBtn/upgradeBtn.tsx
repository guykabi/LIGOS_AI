import React from 'react'
import styles from './upgradeBtn.module.scss'
import { usePremiumModal } from '@/hooks/usePremiumModal'

const UpgradeBtn = () => {

  const {onOpen} = usePremiumModal()

  return (
    <div className={styles.upgradeBtn}>
    <button onClick={onOpen}>UPGRADE</button>
  </div>
  )
}

export default UpgradeBtn