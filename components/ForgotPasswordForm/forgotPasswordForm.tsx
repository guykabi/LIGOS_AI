"use client";

import React, { useEffect } from "react";
import styles from "./forgotPasswordForm.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchemaType } from "@/utils/types";
import { forgotPasswordSchema } from "@/utils/zod/schemas";
import Button from "../Button/Button";
import { SpinnerLoader } from "../SpinnerLoader.tsx/spinnerLoader";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { SendEmail } from "@/actions/auth/sendResetEmail";
import { handleToast } from "@/providers/Toastify/toastify";
import { ErrorHandler } from "@/utils/errorHandler";

const ForgotPasswordForm = () => {
  const {
    mutate: sendEmail,
    data: result,
    error,
    isLoading,
    isSuccess,
    isError,
  } = SendEmail();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleMailSend = (data: forgotPasswordSchemaType) => {
    sendEmail(data.email);
  };

  useEffect(() => {
    if (!result) return;
    handleToast({
      text: result.message,
      type: "success",
      position: "top-center",
    });
    reset()
  }, [isSuccess]);

  useEffect(()=>{
     if(!error)return 
     ErrorHandler(error)
     reset()
  },[isError])

  return (
    <div
      role="form"
      aria-describedby="Reset form"
      className={styles.forgot_passwordWrapper}
    >
      <div className={styles.returnBtn}>
        <Link href={"/api/auth/signin"}>
          <FaArrowLeft size={18} />
        </Link>
      </div>
      <div className={styles.innerWrapper}>
        <form
          onSubmit={handleSubmit(handleMailSend)}
          className={styles.forgot_passwordForm}
        >
          <input
            {...register("email")}
            name="email"
            placeholder="Email"
            type="email"
          />
          {errors.email ? (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          ) : null}

          <div className={styles.submitBtn}>
            <Button
              theme="black"
              text={
                isSubmitting || isLoading ? (
                  <SpinnerLoader size={20} color="gray" />
                ) : (
                  "Send reset link"
                )
              }
              type="submit"
              width={100}
              height={3}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
