"use client";

import styles from "./freeCounter.module.scss";
import { MAX_FREE_USES } from "@/app/api/libs/constants";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import UpgradeBtn from "./UpgardeBtn/upgradeBtn";

type freeCounterProps = {
  counter: number;
};

const FreeCounter = ({ counter = 0 }: freeCounterProps) => {


  return (
    <div 
    role="banner"
    aria-describedby="A section to count the amount of free uses remain"
    className={styles.freeCounter}>
      <div className={styles.content}>
        Free uses : {counter}/{MAX_FREE_USES}
      </div>
      <div className={styles.linearGradient}>
        <Box sx={{ width: "90%", height: "1rem" }}>
          <LinearProgress
            sx={{
              height: "0.7rem",
              borderRadius: "0.2em",
              backgroundColor: "white",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#FF3CAC",
              },
            }}
            variant="determinate"
            value={(counter / MAX_FREE_USES) * 100}
          />
        </Box>
      </div>
      <UpgradeBtn/>
    </div>
  );
};

export default FreeCounter;
