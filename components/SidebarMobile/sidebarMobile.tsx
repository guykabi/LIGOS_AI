import React from 'react'
import styles from './sidebarMobile.module.scss'
import Image from 'next/image'
import { routes } from '../Sidebar/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const SidebarMobile = () => {

  const pathname = usePathname();

  return (
    <div className={styles.sidebarMobile}>
            <div className={styles.mobileLogoWrapper}>
              <Image fill src="/images/AI_LOGO.png" alt="Logo"/>
            </div>  
            <div className={styles.mobileSidebarIcons}>
              {routes.map((card)=>(
                <Link 
                key={card.href}
                href={`${card.href}`}
                className={pathname.startsWith(card.href) ? 
                  styles.mobileIconActive : styles.mobileIcon }
                >
                  {<card.icon size={20}/>}</Link>
              ))}
            </div>
         
      </div>
  )
}

export default SidebarMobile