import React, { useContext, useEffect, useState } from "react";
import styles from "./sideBarMobileCard.module.scss";
import { Route } from "@/components/Sidebar/constants";
import Link from "next/link";
import { ServiceContext } from "@/providers/contextProvider";
import { useGetMessages } from "@/hooks/useGetServiceMessages";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

type SideBarMobileCardProps = {
  route: Route;
  path: string;
};

const SideBarMobileCard = ({ route, path }: SideBarMobileCardProps) => {
  const service: any = path.replace(/[^a-z]/gi, "");
  const cacheKey = `${service.toUpperCase()}_MESSAGES_QUERY_KEY`;
  const rule = service === "dashboard" || service === "settings";

  const [isPreviousQuestions, setIsPreviousQuestions] =
    useState<boolean>(false);
  const { setQuestion } = useContext(ServiceContext);

  const {
    data,
    refetch: fetchMessages,
    isRefetching,
  } = useGetMessages(cacheKey, rule ? null : service);

  useEffect(() => {
    if (route.href !== path || rule) return;
    if (isPreviousQuestions) setIsPreviousQuestions(false);
    fetchMessages();
  }, [path]);

  const handleClickAway = () => {
    setIsPreviousQuestions(false);
  };

  return (
    <div className={styles.mobileIconWrapper} aria-label={service}>
      <div className={styles.linkWrapper}>
        <Link
          key={route.href}
          href={route.href}
          className={
            path.startsWith(route.href)
              ? styles.mobileIconActive
              : styles.mobileIcon
          }
        >
          <div className={styles.routeLabel}>
            <p>{route.icon ? <route.icon /> : null}</p>
          </div>
        </Link>
      </div>
      {data?.length &&
      !isRefetching &&
      route.href.includes(service) &&
      !rule ? (
        <div
          className={styles.openArrow}
          onClick={() => setIsPreviousQuestions((prev) => !prev)}
        >
          {isPreviousQuestions ? (
            <MdKeyboardArrowLeft size={20} />
          ) : (
            <MdKeyboardArrowRight size={20} />
          )}
        </div>
      ) : null}
      {path.startsWith(route.href) && isPreviousQuestions && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={styles.previousQuestions}>
            {data?.map((d, index) => (
              <div
                key={index}
                onClick={() => {
                  setQuestion({ service: service, message: d.content });
                  setIsPreviousQuestions(false);
                }}
              >
                {d.content}
              </div>
            ))}
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default SideBarMobileCard;
