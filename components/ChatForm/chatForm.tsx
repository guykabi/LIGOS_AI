"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {useRouter} from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaType, MessageModel } from "@/utils/types";
import { formSchema } from "@/utils/zod/schemas";
import { useSendMessage } from "@/hooks/useSendMessage";
import Button from "../Button/Button";
import styles from "./chatForm.module.scss";
import Empty from "../Empty/empty";
import Loader from "../Loader/loader";
import Message from "./Message/message";
import { ErrorHandler } from "../../utils/errorHandler";
import { SpinnerLoader } from "../SpinnerLoader.tsx/spinnerLoader";

const allMessages: MessageModel[] = [
  { content: "ecnejfvnnceojofrc4h4urf4rvv4urv4r", role: "user" },
  {
    content:
      "ecnejfvnnceojofrc4h4urf4rvv4urv4r,ejfbbrff   f3jbibribf 3rijvb3irvrvbvbrvbin  3jovj3nrivn 3rjvn3rvirivbirbvbribv j3brvjibr",
    role: "system",
  },
  { content: "ecnejfvnnceojofrc4h4urf4rvv4urv4r", role: "user" },
  {
    content:
      "ecnejfvnnceojofrc4h4urf4rvv4urv4r,ejfbbrff   f3jbibribf 3rijvb3irvrvbvbrvbin  3jovj3nrivn 3rjvn3rvirivbirbvbribv j3brvjibr",
    role: "system",
  },
  { content: "ecnejfvnnceojofrc4h4urf4rvv4urv4r", role: "user" },
  {
    content:
      "ecnejfvnnceojofrc4h4urf4rvv4urv4r,ejfbbrff   f3jbibribf 3rijvb3irvrvbvbrvbin  3jovj3nrivn 3rjvn3rvirivbirbvbribv j3brvjibr",
    role: "system",
  },
  { content: "ecnejfvnnceojofrc4h4urf4rvv4urv4r", role: "user" },
  {
    content:
      "ecnejfvnnceojofrc4h4urf4rvv4urv4r,ejfbbrff   f3jbibribf 3rijvb3irvrvbvbrvbin  3jovj3nrivn 3rjvn3rvirivbirbvbribv j3brvjibr",
    role: "system",
  },
];

const ChatForm = () => {
  const [messages, setMessages] = useState<MessageModel[]>(allMessages);
  const {refresh} = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const {
    mutate: sendMessage,
    data: newMessage,
    isLoading,
    error,
    isSuccess
    } = useSendMessage();

  const handleMessage = async (message: FormSchemaType) => {
    const newMessage: MessageModel = {
      role: "user",
      content: message.content,
    };

    const newMessages = [...messages, newMessage];

    sendMessage(newMessages);
  };

  const messageContainer = (
    <div className={styles.messages}>
      {isLoading ? <Loader text="Ligos is loading..." /> : null}
      {messages?.length === 0 && !isLoading ? (
        <Empty message="No messages yet..." />
      ) : null}
      {!isLoading && messages?.length
        ? messages.map((message, index) => (
            <Message
              key={index}
              content={message.content}
              role={message.role}
            />
          ))
        : null}
    </div>
  );

  useEffect(()=> {

    if (!newMessage) return
    
      let userMessage: MessageModel = {
        role: "user",
        content: getValues("content")
      };

      reset();
      
      setMessages([...messages, userMessage, newMessage]);
      refresh()
  
  },[isSuccess])



  useEffect(()=>{
    if (!error) return 
      reset()
      ErrorHandler(error);
  },[error])


  return (
    <div className={styles.chatFormWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(handleMessage)}>
        <div className={styles.inputWrapper}>
          <input
            {...register("content")}
            name="content"
            type="text"
            placeholder="Ask me anything"
            required
            disabled={isLoading}
          />
          <div className={styles.btnWrapperMobile}>
            <button
              type="submit"
              disabled={isLoading || !watch("content")}
              style={{ color: watch("content") ? "black" : "lightgray" }}
            >
              {isLoading ? <SpinnerLoader size={10} color="gray" /> : "Send"}
            </button>
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <Button
            disabled={isLoading || !watch("content")}
            text={isLoading ? "Loading" : "Send"}
            theme="black"
            type="submit"
            width={70}
            height={4}
          />
        </div>
      </form>
      {messageContainer}
    </div>
  );
};

export default ChatForm;
