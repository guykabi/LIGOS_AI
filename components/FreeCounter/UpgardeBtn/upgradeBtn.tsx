import React from 'react'
import styles from './upgradeBtn.module.scss'
import { usePremiumModal } from '@/hooks/usePremiumModal'
import { FaAngleDoubleUp } from "react-icons/fa";


const UpgradeBtn = () => {

  const {onOpen} = usePremiumModal()

  return (
    <div className={styles.upgradeBtn}>
    <button onClick={onOpen}>
      UPGRADE 
      &nbsp;
      <span>
       <FaAngleDoubleUp size={16}/>
      </span>
    </button>
  </div>
  )
}

export default UpgradeBtn