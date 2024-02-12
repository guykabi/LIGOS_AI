"use client";

import React from "react";
import styles from "./sidebar.module.scss";
import Link from "next/link";
import Image from "next/image";
import { routes } from "./constants";
import { usePathname } from "next/navigation";
import FreeCounter from "../FreeCounter/freeCounter";
import SideBarCard from "./SideBarCard/sideBarCard";
import { useSession } from "next-auth/react";
import PremiumTag from "../PremiumTag/premiumTag";

type SideBarProps = {
  freeUses: number;
};

function Sidebar({ freeUses }: SideBarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className={styles.sidebar}>
      <div className={styles.innersidebar}>
        <Link href="/dashboard" className={styles.link}>
          <div className={styles.logoWrapper}>
            <Image fill src="/images/AI_LOGO.png" alt="Logo" />
          </div>
          <h2>LIGOS</h2>
        </Link>
        <main className={styles.mainSideBar}>

        <div className={styles.routesWrapper}>
          {routes.map((route) => (
            <SideBarCard key={route.href} route={route} path={pathname} />
          ))}
        </div>
        <div className={styles.freeUses}>
          {session?.user.premium ? (
            <PremiumTag />
          ) : (
            <FreeCounter counter={freeUses} />
          )}
        </div>
        </main>
      </div>
    </div>
  );
}

export default Sidebar;
