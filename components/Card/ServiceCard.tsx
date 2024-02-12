import React from "react";
import styles from "./ServiceCard.module.scss";
import { ServiceCard } from "@/utils/types";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Link from "next/link";

const ServiceCard = ({ title, content, color, href }: ServiceCard) => {
  return (
    <div className={styles.cardMainWrapper}>
      <div className={styles.innerCard}>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
      <div className={styles.iconWrapper}>
        <Link href={href} style={{color:`${color}`}}>
          <FaRegArrowAltCircleRight size={22} />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
