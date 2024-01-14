"use client";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { MdDownload } from "react-icons/md";
import { GiShare } from "react-icons/gi";
import Skeleton from "@mui/material/Skeleton";
import Image from "next/image";
import Share from "@/components/Share/share";

type ImageCardProps = {
  src: string;
};

const ImageCard = ({ src }: ImageCardProps) => {
  const [openShare, setOpenShare] = useState<boolean>(false);
  return (
    <Card sx={{ width: "100%", height: 260, position: "relative" }}>
      {openShare ? <Share shareUrl={src} title="Using LIGOS AI" /> : null}
      <Image alt="image" src={src} fill style={{ objectFit: "cover" }} />
      <CardActions disableSpacing>
        <IconButton aria-label="download" onClick={() => window.open(src)}>
          <MdDownload />
        </IconButton>
        <IconButton
          aria-label="share"
          onClick={() => setOpenShare((prev) => !prev)}
        >
          <GiShare />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ImageCard;
