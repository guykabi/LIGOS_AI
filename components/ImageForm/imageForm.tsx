"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {useRouter} from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageType, ImageSchemaType } from "@/utils/types";
import { imageFormSchema } from "@/utils/zod/schemas";
import Button from "../Button/Button";
import styles from "./imageForm.module.scss";
import Empty from "../Empty/empty";
import { ErrorHandler } from "../../utils/errorHandler";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SpinnerLoader } from "../SpinnerLoader.tsx/spinnerLoader";
import ImageCard from "./ImageCard/imageCard";
import { amountOptions, resolutionOptions } from "./constants";
import SkeletonLoader from "../CardLoader/cardLoader";
import { useSendImage } from "@/hooks/useSendImage";
import { usePremiumModal } from "@/hooks/usePremiumModal";

const allImages = [
  {
    url: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
  },
  {
    url: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
  },
  {
    url: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
  },
  {
    url: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
  },
  {
    url: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
  },
]


const ImageForm = () => {
  const [images, setImages] = useState<ImageType[]>(allImages);

  const {refresh} = useRouter()
  const {onOpen} = usePremiumModal()

  const {
    data:newImage,
    isSuccess,
    mutate: sendImage,
    error,
    isLoading,
  } = useSendImage();

  const { register, handleSubmit, watch, control, reset } =
    useForm<ImageSchemaType>({
      resolver: zodResolver(imageFormSchema),
    });

  const handleMessage = async (values: ImageSchemaType) => {
    setImages([])
    reset()
    sendImage(values);
  };

  const imagesContainer = (
    <>
    {images?.length === 0 && !isLoading ? (
      <div className={styles.imagesEmptyComponent}>
        <Empty message="No images yet..." />
      </div>
    ):(
    <div className={styles.images}>
      {isLoading ? <SkeletonLoader amount={6} /> : null}
      {!isLoading && images?.length
        ? images.map((image) => <ImageCard key={image.url} src={image.url} />)
        : null}
    </div>)}
    </>
  );


  useEffect(()=>{

    if (!newImage?.length) return
     
      const urls = newImage?.map(({ url }) => ({ url }));
      setImages(urls);
      refresh()
  },[isSuccess])

  useEffect(()=>{
    if (!error) return 
    reset()

    let res = ErrorHandler(error);
    if (res === "Premuim is required") onOpen();


  },[error])

  return (
    <div className={styles.imageFormWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(handleMessage)}>
        <div className={styles.inputWrapper}>
          <input
            {...register("prompt")}
            name="prompt"
            type="text"
            placeholder="How to reverse a binary tree ?"
            required
            disabled={isLoading}
          />
          <div className={styles.btnWrapperMobile}>
            <button
              type="submit"
              disabled={isLoading || !watch("prompt")}
              style={{ color: watch("prompt") ? "black" : "lightgray" }}
            >
              {isLoading ? <SpinnerLoader size={10} color="gray" /> : "Send"}
            </button>
          </div>
        </div>
        <div className={styles.selectsWrapper}>
          <Box style={{ minWidth: "45%" }}>
            <FormControl fullWidth>
              <InputLabel id="amount-label">Amount</InputLabel>
              <Controller
                name="amount"
                control={control}
                defaultValue="1"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field} labelId="amount-label" label="Amount">
                    {amountOptions.map((amount) => (
                      <MenuItem key={amount.value} value={amount.value}>
                        {amount.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Box>

          <Box style={{ minWidth: "45%" }}>
            <FormControl fullWidth>
              <InputLabel id="resolution-label">Size</InputLabel>
              <Controller
                name="resolution"
                control={control}
                defaultValue="512x512"
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field} label="Size" labelId="resolution-label">
                    {resolutionOptions.map((res) => (
                      <MenuItem key={res.value} value={res.value}>
                        {res.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            {/* <FormHelperText error={true}>{errors.level?.message}</FormHelperText> */}
          </Box>
        </div>
        <div className={styles.btnWrapper}>
          <Button
            disabled={isLoading || !watch("prompt")}
            text={isLoading ? "Loading..." : "Send"}
            theme="black"
            type="submit"
            width={70}
            height={4}
          />
        </div>
      </form>
      {imagesContainer}
    </div>
  );
};

export default ImageForm;
