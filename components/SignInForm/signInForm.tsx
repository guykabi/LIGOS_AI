"use client";

import React, { useEffect, useState } from "react";
import styles from "./signInForm.module.scss";
import Button from "../Button/Button";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../utils/zod/schemas";
import { signInSchemaType } from "@/utils/types";
import { FaArrowLeft, FaGithub, FaGoogle } from "react-icons/fa";
import { ErrorHandler } from "../../utils/errorHandler";
import { signIn } from "next-auth/react";
import { SpinnerLoader } from "../SpinnerLoader.tsx/spinnerLoader";

const SignInForm = () => {
  const [isError, setIsError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<signInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  const handleCredentialsSignIn = async ({ email, password }: FieldValues) => {
    let res = await signIn("credentials", {
      callbackUrl: "/dashboard",
      redirect: true,
      email,
      password,
    });
    
    reset();

    if (res?.error) {
      setIsError(res.error);
    }
  };

  const handleProvidersSignIn = async (provider: string) => {
    setIsLoading(true);
    const res = await signIn(provider, {
      callbackUrl: "/dashboard",
      redirect: false,
    });
    setIsLoading(false);

    if (res?.error) {
      setIsLoading(false);
      setIsError(res.error);
    }
  };

  useEffect(() => {
    if (!isError) return;
    ErrorHandler(isError);
  }, [isError]);

  return (
    <div className={styles.signInWrapper}>
      <div className={styles.returnBtn}>
        <Link href={"/"}>
          <FaArrowLeft size={25} />
        </Link>
      </div>
      <div className={styles.innerWrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Sign In
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(handleCredentialsSignIn)}
          className={styles.credentialsForm}
        >
          <input {...register("email")} name="email" placeholder="Email" />
          <input
            {...register("password")}
            name="password"
            placeholder="Password"
            type="password"
          />
          <div className={styles.submitBtn}>
            <Button
              theme="black"
              text={
                isSubmitting ? <SpinnerLoader size={20} color="gray" /> : "Send"
              }
              type="submit"
              width={100}
              height={3}
              disabled={isSubmitting}
            />
          </div>
        </form>
        <div className={styles.divderLine}>
        {isLoading || isSubmitting ? (
              <SpinnerLoader size={30} color="black" />
            ) : (
              "OR"
            )}
        </div>
        <div className={styles.providersButtons}>
          <div className={styles.innerProvidersButtons}>
            <Button
              text="Github"
              icon={<FaGithub color="red" />}
              theme="black"
              width={100}
              disabled={isLoading}
              onClick={() => handleProvidersSignIn("github")}
            />
            <Button
              text="Google"
              theme="blue"
              icon={<FaGoogle color="red" />}
              width={100}
              disabled={isLoading}
              onClick={() => handleProvidersSignIn("google")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
