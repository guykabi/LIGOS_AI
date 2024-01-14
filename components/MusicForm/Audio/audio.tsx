import React from "react";
import { MusicType } from "@/utils/types";
import styles from "./audio.module.scss";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

const Audio = ({ audio }: MusicType) => {

  return (
    <div className={styles.audioWrapper}>
      <div className={styles.senderIcon}>
        <Image width={20} height={20} alt="Ligos" src="/images/AI_LOGO.png" />
      </div>
      <div className={styles.content}>
        <audio controls className={styles.audioItem}>
          <source src={audio} />
        </audio>
      </div>
    </div>
  );
};

export default Audio;
