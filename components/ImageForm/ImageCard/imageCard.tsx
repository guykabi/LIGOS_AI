"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { MdDownload } from "react-icons/md";
import Image from "next/image";
import { saveAs } from 'file-saver'


type ImageCardProps = {
  src: string;
  searchKey:string | undefined
};

const ImageCard = ({ src,searchKey }: ImageCardProps) => {
 

  const downloadImage = () => {
    let savedName = `${searchKey}.png`
    saveAs(src,savedName)
  }


  return (
    <Card sx={{ width: "100%", height: 260, position: "relative" }}>
      <Image alt="image" src={src} fill style={{ objectFit: "cover" }} />
      <CardActions disableSpacing>
        <IconButton 
        sx={{
          background:'white'
        }}
        aria-label="download" 
        onClick={downloadImage}>
          <MdDownload color="black" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ImageCard;
