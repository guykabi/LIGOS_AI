'use client'

import React, { useEffect, useState } from 'react'
import PremiumModal from '@/components/PremiumModal/premiumModal'

const ModalProvider = () => {

 const [isMounted,setIsMounted]=useState<boolean>(false)

 useEffect(()=>{
   setIsMounted(true)
 },[])

 if(!isMounted) return null

  return (
   <>
     <PremiumModal/>
   </>
  )
}

export default ModalProvider