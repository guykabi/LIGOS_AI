'use client'

import styles from './navbar.module.scss'
import { signOut } from 'next-auth/react'
import {useSession} from 'next-auth/react'
import Image from 'next/image'
import { MdLogout } from "react-icons/md";
import { RxAvatar } from 'react-icons/rx'
import { useRouter } from 'next/navigation'
import FreeCounter from '../FreeCounter/freeCounter'
import PremiumTag from '../PremiumTag/premiumTag'

type NavbarProps = {
  freeUses:number
}

export const Navbar = ({freeUses}:NavbarProps) => {
  
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
            alt='image' 
            src={session.user.image} 
            width={20} 
            height={20}
            style={{borderRadius:'50%'}}
             />:
            <RxAvatar size={20}/>}
        
        <p>{session? `${session?.user?.name}`:'Guest'}</p>
      </div>
      <div className={styles.freeCounterNavBar}>
        {session?.user.premium ? 
          <PremiumTag/> : <FreeCounter counter={freeUses} />}
      </div>
      <div className={styles.signoutbtn} onClick={handleSignOut}>
          <MdLogout size={25}/>
      </div>
    </div>
  )
}
