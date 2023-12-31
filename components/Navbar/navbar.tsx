'use client'

import React from 'react'
import styles from './navbar.module.scss'
import { signOut } from 'next-auth/react'
import {useSession,getSession} from 'next-auth/react'
import Image from 'next/image'
import { MdLogout } from "react-icons/md";
import { RxAvatar } from 'react-icons/rx'
import { useRouter } from 'next/navigation'


export const Navbar = () => {
  
  const {data:session} = useSession()
  const {push} = useRouter()

  const handleSignOut = async () =>{
    await signOut({redirect:false})
    push('/')
  }
 
  return (
    <div className={styles.navbar}>
      <div className={styles.userDetails}>
        {session?.user?.image ?  
            <Image 
            alt='User Image' 
            src={session?.user?.image} 
            width={20} 
            height={20}
            style={{borderRadius:'50%'}}
             />:
            <RxAvatar size={20}/>}
          {session?.user?.image}
        
        <h4>{session? `Hey ${session?.user?.name}`:null}</h4>
      </div>
      <div className={styles.signoutbtn} onClick={handleSignOut}>
          <MdLogout size={25}/>
      </div>
    </div>
  )
}
