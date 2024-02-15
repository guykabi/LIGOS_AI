import React from 'react'
import styles from './upgradeBtn.module.scss'
import { usePremiumModal } from '@/hooks/usePremiumModal'
import { FaAngleDoubleUp } from "react-icons/fa";


const UpgradeBtn = () => {

  const {onOpen} = usePremiumModal()

  return (
    <div 
    role="button" 
    aria-describedby="A button to upgrade to premium account"
    className={styles.upgradeBtn}>
    <button onClick={onOpen}>
      UPGRADE 
      <p>
       <FaAngleDoubleUp size={16}/>
      </p>
    </button>
  </div>
  )
}

export default UpgradeBtn