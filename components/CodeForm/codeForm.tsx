"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaType, MessageModel } from "@/utils/types";
import { formSchema } from "@/utils/zod/schemas";
import Button from "../Button/Button";
import styles from "./codeForm.module.scss";
import Empty from "../Empty/empty";
import Loader from "../Loader/loader";
import Message from "../ChatForm/Message/message";
import { sendCodeMessage } from "@/app/(dashboard)/actions";
import { useMutation } from "react-query";
import { ErrorHandler } from "../../utils/errorHandler";
import { SpinnerLoader } from "../SpinnerLoader.tsx/spinnerLoader";

const allMessages: MessageModel[] = [
  { id: 1, content: "efgegegergegegeg efkgneofgog efjon", role: "user" },
  {
    id: 2,
    content:
      "Here is an example: ```jsx import Markdown from '@/components/CodeForm/Markdown/markdown'; type MessageProps = {content: string;role: string;}; const Message = ({ content, role }: MessageProps) => {const { data: session } = useSession(); const pathname = usePathname(); return ( <> <div className={role === 'user' ? styles.userMessage : styles.message}> {role === 'user' ? ( <p> {session?.user?.image ? ( <Image alt='User Image' src={session?.user?.image} width={20} height={20} style={{ borderRadius: '50%' }}/> ) : (  <RxAvatar size={20} /> )} </p> ) : (  <p>  <Image width={20} height={20} alt='Ligos' src='/images/AI_LOGO.png'/> </p> )} <div className={styles.content}> {pathname.startsWith('/codeGeneration') ? (  <Markdown content={content} /> ) : (   <>{content}</> )} </div> </div> </> ); }; export default Message; ``` So got it ? `useState` than",
    role: "system",
  },
  { id: 3, content: "ecnejfvnnceojofrc4h4urf4rvv4urv4r", role: "user" },
  {
    id: 4,
    content:
      "ecnejfvnnceojofrc4h4urf4rvv4urv4r,ejfbbrff   f3jbibribf 3rijvb3irvrvbvbrvbin  3jovj3nrivn 3rjvn3rvirivbirbvbribv j3brvjibr",
    role: "system",
  },
  { id: 5, content: "ecnejfvnnceojofrc4h4urf4rvv4urv4r", role: "user" },
  {
    id: 6,
    content:
      "ecnejfvnnceojofrc4h4urf4rvv4urv4r,ejfbbrff   f3jbibribf 3rijvb3irvrvbvbrvbin  3jovj3nrivn 3rjvn3rvirivbirbvbribv j3brvjibr",
    role: "system",
  },
  { id: 7, content: "ecnejfvnnceojofrc4h4urf4rvv4urv4r", role: "user" },
  {
    id: 8,
    content:
      "ecnejfvnnceojofrc4h4urf4rvv4urv4r,ejfbbrff   f3jbibribf 3rijvb3irvrvbvbrvbin  3jovj3nrivn 3rjvn3rvirivbirbvbribv j3brvjibr",
    role: "system",
  },
];

const CodeForm = () => {
  const [messages, setMessages] = useState<MessageModel[]>(allMessages);

  const {
    mutate: sendMsg,
    isLoading,
    error,
  } = useMutation(sendCodeMessage, {
    onSuccess: (data) => {
      let userMessage: MessageModel = {
        role: "user",
        content: getValues("content"),
      };
      setMessages([...messages, userMessage, data]);
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const handleMessage = async (message: FormSchemaType) => {
    const newMessage: MessageModel = {
      role: "user",
      content: message.content,
    };

    const newMessages = [...messages, newMessage];

    sendMsg(newMessages);
  };

  if (error) {
    ErrorHandler(error);
  }

  return (
    <div className={styles.chatFormWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(handleMessage)}>
        <div className={styles.inputWrapper}>
          <input
            {...register("content")}
            name="content"
            type="text"
            placeholder="How to reverse a binary tree ?"
            required
            disabled={isLoading}
          />
          <div className={styles.btnWrapperMobile}>
            <button
              type="submit"
              disabled={isLoading || !watch("content")}
              style={{ color: watch("content") ? "black" : "lightgray" }}
            >
              {isLoading ? <SpinnerLoader size={10} color="gray"/> : "Send"}
            </button>
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <Button
            disabled={isLoading || !watch("content")}
            text={isLoading ? "Loading..." : "Send"}
            theme="black"
            type="submit"
            height={4}
          />
        </div>
      </form>
      {isLoading ? <Loader /> : null}
      <div className={styles.messages}>
        {messages?.length === 0 && !isLoading ? (
          <Empty message="No messages yet..." />
        ) : null}
        {!isLoading && messages?.length
          ? messages.map((message) => (
              <Message
                key={message.id}
                content={message.content}
                role={message.role}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default CodeForm;
