"use client";

import React from "react";
import global from "../routesGlobal.module.scss";
import ServiceCard from "@/components/Card/ServiceCard";
import { Cards } from "@/components/Card/constants";
import styles from "./dashboard.module.scss";
import Header from "@/components/Header/header";
import { MdOutlineSpaceDashboard } from "react-icons/md";

function Dashboard() {

  return (
    <div className={global.globalServiceWrapper}>
      <Header 
      title="LIGOS" 
      description="Feel the power of AI"
      icon={<MdOutlineSpaceDashboard size={25}/>}
      color='rgb(75, 75, 159)'
      />
      <div className={styles.cardsWrapper}>
        {Cards.map((card) => (
          <ServiceCard
            key={card.href}
            content={card.content}
            title={card.title}
            href={card.href}
            color={card.color}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
