"use client"

import React from "react";
import styles from "./sidebarMobile.module.scss";
import Image from "next/image";
import { routes } from "../Sidebar/constants";
import { usePathname } from "next/navigation";
import SideBarMobileCard from "./SideBarMobileCard/sideBarMobileCard";

const SidebarMobile = () => {
  const pathname = usePathname();

  return (
    <div 
    className={styles.sidebarMobile}
    role="navigation" 
    aria-describedby="A mobile navigation element for the entire app"
    >
      <div className={styles.mobileLogoWrapper}>
        <Image
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          src="/images/AI_LOGO.png"
          alt="Logo"
        />
      </div>
      <div className={styles.mobileSidebarIcons}>
        {routes.map((card) => (
            <SideBarMobileCard key={card.href} route={card} path={pathname}/>
        ))}
      </div>
    </div>
  );
};

export default SidebarMobile;
