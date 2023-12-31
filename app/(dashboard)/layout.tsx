"use client";

import React, { useEffect, useState } from "react";
import styles from "./layout.module.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar/navbar";
import SidebarMobile from "@/components/SidebarMobile/sidebarMobile";


function Layout({ children }: { children: React.ReactNode }) {

  

  return (
    <div className={styles.maindashboard}>
        <Sidebar/>
        <SidebarMobile/>
      <main className={styles.contentwrapper}>
        <Navbar />
        {children}
      </main>
    </div>
  );
}

export default Layout;
