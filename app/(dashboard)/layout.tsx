
import React, { useEffect } from "react";
import styles from "./layout.module.scss";
import Sidebar from "@/components/Sidebar/sidebar";
import { Navbar } from "@/components/Navbar/navbar";
import SidebarMobile from "@/components/SidebarMobile/sidebarMobile";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { checkApiLimitCount } from "../api/libs/apiLimit";
import NotFound from "../not-found";


async function DashboardLayout({ children }: { children: React.ReactNode }) {

  const session = await getServerSession(authOptions)
  
  if(!session){
    return null
  }

  const freeUsesCount = await checkApiLimitCount(session.user.id)
  
  return (
    <div className={styles.maindashboard}>
        <Sidebar freeUses={freeUsesCount}/>
        <SidebarMobile/>
      <main className={styles.contentwrapper}>
        <Navbar freeUses={freeUsesCount} />
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
