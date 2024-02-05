"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "./sideBarCard.module.scss";
import { Route } from "../constants";
import Link from "next/link";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useGetMessages } from "@/hooks/useGetServiceMessages";
import { SpinnerLoader } from "@/components/SpinnerLoader.tsx/spinnerLoader";
import { ServiceContext } from "@/providers/contextProvider";

type SideBarCardProps = {
  route: Route;
  path: string;
};

const SideBarCard = ({ route, path }: SideBarCardProps) => {
  const service: any = path.replace(/[^a-z]/gi, "");
  const cacheKey = `${service.toUpperCase()}_MESSAGES_QUERY_KEY`;
  const rule = service === "dashboard" || service === "settings";

  const [isPreviousQuestions, setIsPreviousQuestions] =
    useState<boolean>(false);
  const {setQuestion} = useContext(ServiceContext)
 

  const {
    data,
    refetch: fetchMessages,
    isRefetching,
  } = useGetMessages(cacheKey, rule ? null : service);

  useEffect(() => {  
    if (route.href !== path || rule) return;

    fetchMessages();
  }, [path]);

  return (
    <div
      className={
        path.startsWith(route.href) ? styles.routerLinkActive : styles.routeLink
      }
    >
      <div className={styles.cardHeaderWrapper}>
        <Link key={route.href} href={route.href} className={styles.link}>
          <div className={styles.routeLabel}>
            <p>{route.icon ? <route.icon /> : null}</p>
            <p>{route.label}</p>
          </div>
        </Link>
        {data?.length && !isRefetching && !rule ? (
          <div
            className={styles.openArrow}
            onClick={() => setIsPreviousQuestions((prev) => !prev)}
          >
            {isPreviousQuestions ? <FaArrowUp /> : <FaArrowDown />}
          </div>
        ) : null}
        {isRefetching && route.href === path && !rule ? (
          <div className={styles.loader}>
            <SpinnerLoader color="white" size={20} />
          </div>
        ) : null}
      </div>
      {path.startsWith(route.href) && isPreviousQuestions && (
        <div className={styles.previousQuestions}>
          {data?.map((d, index) => (
            <div 
            key={index}
            onClick={()=>setQuestion({service:service,message:d.content})}
            >{d.content}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBarCard;
