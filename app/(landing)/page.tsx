import React from 'react'
import styles from './landing.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import LOGO from '../opengraph-image.png'
import Button from '@/components/Button/Button'
import {FaArrowRight} from 'react-icons/fa'
import {redirect} from 'next/navigation'
import { getServerSession } from 'next-auth'

async function Landing() {

  const session =  await getServerSession()

if (session?.user) {
    redirect('/dashboard')
}

  return (
    <div
      role="main"
      aria-describedby="Ligos home page" 
     className={styles.main}>
      
      <header className={styles.header}>
         <div className={styles.logo}>
          <p>
            <Image 
              alt='logo'
              src={LOGO}
              width={35}
              height={35}
              />
          </p>
          <p className={styles.text}>LIGOS</p>
         </div>
         <div className={styles.signinLink}>         
          <Link href='/api/auth/signin'>
            <p>Sign In</p>
          </Link>
         </div>
        </header>

      <main className={styles.mainContent}>
        <div className={styles.innerText}>
         <h3>Feel the power of the AI</h3> 
         <p>Start to generate fast content</p> 
         <p>With &nbsp;<span>LIGOS AI</span></p>
         <div className={styles.signupbtn}>
         <Link href='/register'>
          <Button icon={<FaArrowRight />} text='Register' theme='white' height={4} width={50}/>
         </Link>
        </div>
        </div>
        
      </main>
    </div>
  )
}

export default Landing