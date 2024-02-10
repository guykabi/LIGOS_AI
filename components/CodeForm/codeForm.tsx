"use client";

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {useRouter} from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaType, MessageModel } from "@/utils/types";
import { formSchema } from "@/utils/zod/schemas";
import Button from "../Button/Button";
import styles from "./codeForm.module.scss";
import Empty from "../Empty/empty";
import Loader from "../Loader/loader";
import Message from "../ChatForm/Message/message";
import { ErrorHandler } from "../../utils/errorHandler";
import { SpinnerLoader } from "../SpinnerLoader.tsx/spinnerLoader";
import { useSendCode } from "@/hooks/useSendCode";
import { usePremiumModal } from "@/hooks/usePremiumModal";
import { ServiceContext } from "@/providers/contextProvider";


const CodeForm = () => {
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const {question,setQuestion} = useContext(ServiceContext)
  const {onOpen} = usePremiumModal()
  const {refresh} = useRouter()

  const {
    mutate: sendCode,
    data: newMessage,
    isLoading,
    error,
    isSuccess
  } = useSendCode();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const handleMessage = async (message: FormSchemaType) => {
    const newMessage: MessageModel = {
      role: "user",
      content: message.content
    };

    const newMessages = [...messages, newMessage];
    sendCode(newMessages);
  };


  useEffect(()=>{
    
    if(question.service !== 'Code') return

    let body:MessageModel = {
      content:question.message,
      role:'user'
    }
    
    handleMessage(body)
  },[question])


  
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

  useEffect(()=>{

    if (!newMessage) return
    
      let userMessage: MessageModel = {
        role: "user",
        content: getValues("content") || question.message,
      };
      
      setMessages([...messages,userMessage,newMessage]);
      if(question.message) setQuestion({service:undefined,message:''})
      reset()
      refresh()
  },[isSuccess])


  useEffect(()=>{
    if (!error) return 
    reset()

    let res = ErrorHandler(error);
    if (res === "Premuim is required") onOpen();

  },[error])

  
  return (
    <div className={styles.codeFormWrapper}>
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
              {isLoading ? <SpinnerLoader size={10} color="gray" /> : "Send"}
            </button>
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <Button
            disabled={isLoading || !watch("content")}
            text={isLoading ? "Loading..." : "Send"}
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

export default CodeForm;
