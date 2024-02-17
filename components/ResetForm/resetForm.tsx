"use client";

import React, { useEffect } from "react";
import styles from "./resetForm.module.scss";
import { useForm } from "react-hook-form";
import {useRouter} from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { resetSchemaType } from "@/utils/types";
import { resetSchema } from "@/utils/zod/schemas";
import Button from "../Button/Button";
import { SpinnerLoader } from "../SpinnerLoader.tsx/spinnerLoader";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { ResetPassword } from "@/actions/auth/resetPassword";
import { handleToast } from "@/providers/Toastify/toastify";
import { ErrorHandler } from "@/utils/errorHandler";

type ResetProps = {
  token: string;
};

const ResetForm = ({ token }: ResetProps) => {
  
  const {push} = useRouter()

  const {
    mutate: newPassword,
    data,
    isError,
    error,
    isLoading,
    isSuccess,
  } = ResetPassword();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<resetSchemaType>({
    resolver: zodResolver(resetSchema),
  });

  const handleResetPassword = (data: resetSchemaType) => {
    newPassword({password:data.password,token});
  };

  useEffect(() => {
    if (!data) return;
    handleToast({
      text: data.message,
      type: "success",
      position: "top-center",
    });
    reset();
    return push('/api/auth/signin')
    
  }, [isSuccess]);

  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
    reset();
  }, [isError, error]);

  return (
    <div
      role="form"
      aria-describedby="Reset form"
      className={styles.resetWrapper}
    >
      <div className={styles.returnBtn}>
        <Link href={"/"}>
          <FaArrowLeft size={18} />
        </Link>
      </div>
      <div className={styles.innerWrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>Reset</h2>
        </div>
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className={styles.resetForm}
        >
          <input
            {...register("password")}
            name="password"
            placeholder="Password"
            type="password"
          />
          {errors.password ? (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          ) : null}
          <input
            {...register("confirmPassword")}
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
          />
          {errors.confirmPassword ? (
            <span style={{ color: "red" }}>
              {errors.confirmPassword.message}
            </span>
          ) : null}
          <div className={styles.submitBtn}>
            <Button
              theme="black"
              text={
                isSubmitting || isLoading ? (
                  <SpinnerLoader size={20} color="gray" />
                ) : (
                  "Reset"
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

export default ResetForm;
