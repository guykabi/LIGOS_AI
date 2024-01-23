"use client";

import React from "react";
import styles from "./premiumModal.module.scss";
import variable from "../../public/assets/styles/variables.module.scss";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { GrUpgrade } from "react-icons/gr";
import { CiCircleCheck } from "react-icons/ci";
import Chip from "@mui/material/Chip";

import { usePremiumModal } from "@/hooks/usePremiumModal";
import { Cards } from "../Card/constants";

const PremiumModal = () => {
  const { onClose, isOpen } = usePremiumModal();

  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
      className={styles.dialog}
      sx={{
        backdropFilter: "blur(5px)",
      }}
    >
      <DialogTitle className={styles.dialogHeader}>
        Upgrade to LIGOS <Chip label="PREMIUM" className={styles.chip} />
      </DialogTitle>
      <List className={styles.listWrapper}>
        {Cards.map((card) => (
          <div className={styles.cardWrapper} key={card.href}>
            <div className={styles.icon}>
              {<card.icon size={25} color={card.color} />}
            </div>
            <div className={styles.cardTitle}>{card.title}</div>
            <div className={styles.tag}>
              <CiCircleCheck size={25} />
            </div>
          </div>
        ))}
        <div className={styles.upgradeBtn}>
          <button>Upgrade</button>
        </div>
      </List>
    </Dialog>
  );
};

export default PremiumModal;
