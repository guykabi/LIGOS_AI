"use client";

import React, { useEffect, useState } from "react";
import styles from "./settingsForm.module.scss";
import { useSession } from "next-auth/react";
import TextField from "@mui/material/TextField";
import Image from "next/image";
import Button from "../Button/Button";
import { IconButton } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { ACCEPTED_IMAGE_TYPES, detailsFormSchema } from "@/utils/zod/schemas";
import { DetailsSchemaType } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import UpgradeBtn from "../FreeCounter/UpgardeBtn/upgradeBtn";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TiDelete } from "react-icons/ti";
import { useSendSettings } from "@/hooks/useSendSettings";
import { SpinnerLoader } from "../SpinnerLoader.tsx/spinnerLoader";

const SettingsForm = () => {
  const { data: session, update } = useSession();
  const [previewImage, setPreviewImage] = useState<string | null>();
  const isMobileFormat = useMediaQuery("(max-width: 968px)");

  const {
    mutate: sendDetails,
    data: newDetails,
    isLoading,
    isSuccess,
  } = useSendSettings();

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    getValues,
    resetField,
    reset,
    control,
  } = useForm<DetailsSchemaType>({
    resolver: zodResolver(detailsFormSchema),
    defaultValues: {
      name: session?.user.name!,
      email: session?.user.email!,
      image: session?.user.image || undefined,
    },
  });

  const handleSubmitDetails = async (data: DetailsSchemaType) => {
    const formData = new FormData();

    if (getValues("image").name) {
      
      for (let key in data) {
        formData.append(key, data[key as keyof DetailsSchemaType]);
      }
      sendDetails(formData);
      setPreviewImage(null);
    }
    else{
      delete data.image;
      for (let key in data) {
        formData.append(key, data[key as keyof DetailsSchemaType]);
      }
      sendDetails(formData);
    }
  };

  const handleResetImage = () => {
    resetField("image");
    setPreviewImage(null);
  };

  useEffect(() => {
    if (!newDetails) return;

    reset()
    update({ name: newDetails?.name, image: newDetails?.image });
  }, [isSuccess]);

  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.userDetails}>
        <h3>Details</h3>
        <form
          className={styles.form}
          onSubmit={handleSubmit(handleSubmitDetails)}
        >
          <div className={styles.userImageWrapper}>
            {previewImage ? (
              <div className={styles.removeImage}>
                <IconButton
                  aria-label="remove image"
                  sx={{
                    minHeight: 0,
                    minWidth: 0,
                    padding: 0,
                    background: "white",
                  }}
                  onClick={handleResetImage}
                >
                  <TiDelete size={20} />
                </IconButton>
              </div>
            ) : null}
            <Image
              alt="user image"
              src={
                previewImage
                  ? previewImage
                  : session?.user.image
                  ? session.user.image
                  : "/images/no-avatar.png"
              }
              width={100}
              height={100}
            />
            {session?.user.byCredentials ? (
              <IconButton
                component="label"
                disableRipple
                sx={{
                  position: "relative",
                  width: "100%",
                  fontSize: "medium",
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "black",
                  },
                }}
              >
                Upload Image
                <Controller
                  control={control}
                  name={"image"}
                  render={({ field: { value, onChange, ...field } }) => {
                    return (
                      <TextField
                        {...register("image")}
                        name="image"
                        type="file"
                        inputProps={{ accept: ACCEPTED_IMAGE_TYPES }}
                        id="image"
                        onChange={(event: any) => {
                          onChange(event.target.files[0]);
                          setPreviewImage(
                            URL.createObjectURL(event.target.files[0])
                          );
                        }}
                        sx={{
                          "& fieldset": { display: "none" },
                          "& input": { display: "none" },
                          "& .MuiFormHelperText-root": {
                            fontWeight: isMobileFormat ? "400" : "bold",
                            margin: "auto",
                          },
                        }}
                        hidden
                        error={!!errors.image}
                        helperText={errors.image?.message?.toString()}
                      />
                    );
                  }}
                />
              </IconButton>
            ) : null}
          </div>
          <TextField
            id="name"
            type="text"
            variant="standard"
            label="name"
            disabled={!session?.user.byCredentials}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            id="email"
            type="text"
            variant="standard"
            label="email"
            disabled={true}
            {...register("email")}
          />
          <Button
            text={isLoading ? <SpinnerLoader size={16} /> : "Update"}
            theme="blue"
            width={100}
            type="submit"
            disabled={
              !session?.user.byCredentials ||
              isLoading ||
              !Object.keys(dirtyFields).length
            }
          />
        </form>
      </div>
      <div className={styles.middleLine}></div>
      <div className={styles.billingDetails}>
        <h3>Billing</h3>
        {session?.user.premium ? (
          <div className={styles.premiumDetails}>
            <p>Monthly susbscription</p>
          </div>
        ) : (
          <div className={styles.nonePremiumDetails}>
            <p>Upgrade to premium for access to all features</p>
            <UpgradeBtn />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsForm;
