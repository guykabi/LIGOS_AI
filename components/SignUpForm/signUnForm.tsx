"use client";

import React, { useState } from "react";
import Button from "../Button/Button";
import styles from "./signUpForm.module.scss";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../../utils/zod/schemas";
import { SignUpSchema } from "@/utils/types";
import { handleRegister } from "@/actions/auth/register";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { handleToast } from "@/providers/Toastify/toastify";
import { ErrorHandler } from "../../utils/errorHandler";

export const SignUpForm = () => {
  const { push } = useRouter();

  const {
    mutate: signUp,
    isLoading,
    error,
  } = useMutation(handleRegister, {
    onSuccess: (data) => {
      if (data?.message === "User created!") {
        handleToast({
          type: "success",
          text: "Register done successfully",
          position: "top-center",
        });
        setTimeout(() => {
          return push("/");
        }, 4000);
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const handleForm = async (data: FieldValues) => {
    signUp(data);
    reset();
  };

  if (error) {
    ErrorHandler(error);
  }

  return (
    <div className={styles.signInMainWrapper}>
      <div className={styles["rightside-div"]}>
        <div className={styles["bg-image"]}></div>
        <div className={styles.sideText}>
          <span>Simple.</span>
          <span>Easy.</span>
          <span>Fast.</span>
        </div>
      </div>
      <div className={styles.innerWrapper}>
        <div className={styles.returnbtn}>
          <Link href={"/"}>
            <FaArrowLeft size={20} />
          </Link>
        </div>
        <header className={styles["form-header"]}>
          <p>Register</p>
        </header>
        <form className={styles.form} onSubmit={handleSubmit(handleForm)}>
          <main className={styles["form-main"]}>
            <input
              {...register("fullname")}
              name="fullname"
              type="text"
              placeholder="Fullname"
            />
            {errors.fullname ? <p>{errors.fullname.message}</p> : null}

            <input
              {...register("email")}
              name="email"
              type="email"
              placeholder="Email"
            />
            {errors.email ? <p>{errors.email.message}</p> : null}

            <input
              {...register("password")}
              name="password"
              type="password"
              placeholder="Password"
            />
            {errors.password ? <p>{errors.password.message}</p> : null}

            <input
              {...register("confirmPassword")}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword ? (
              <p>{errors.confirmPassword.message}</p>
            ) : null}
          </main>

          <Button
            disabled={isLoading}
            width={70}
            text={isLoading ? "Loading..." : "Send"}
            theme="black"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};
