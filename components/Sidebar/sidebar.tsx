"use client";

import React from "react";
import styles from "./sidebar.module.scss";
import Link from "next/link";
import Image from "next/image";
import { routes } from "./constants";
import { usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";



function Sidebar() {
  const pathname = usePathname();

  return (
    <div className={styles.sidebar}>
      <div className={styles.innersidebar}>
        
        <Link href="/dashboard" className={styles.link}>
          <div className={styles.logoWrapper}>
            <Image fill src="/images/AI_LOGO.png" alt="Logo" />
          </div>
          <h2>Ligos</h2>
        </Link>
        
        <div className={styles.routesWrapper}>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={
                pathname.startsWith(route.href)
                  ? styles.routerLinkActive
                  : styles.routeLink
              }
            >
              <div className={styles.routeLabel}>
                <p>{route.icon ? <route.icon /> : null}</p>
                <p>{route.label}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.score}>
          <p>Free uses : 5</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
