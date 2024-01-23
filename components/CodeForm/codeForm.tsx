"use client";

import React, { useEffect, useState } from "react";
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


const allMessages: MessageModel[] = [
  { content: "efgegegergegegeg efkgneofgog efjon", role: "user" },
  {
    content:
      "Here is an example: ```jsx import Markdown from '@/components/CodeForm/Markdown/markdown'; type MessageProps = {content: string;role: string;}; const Message = ({ content, role }: MessageProps) => {const { data: session } = useSession(); const pathname = usePathname(); return ( <> <div className={role === 'user' ? styles.userMessage : styles.message}> {role === 'user' ? ( <p> {session?.user?.image ? ( <Image alt='User Image' src={session?.user?.image} 20} height={20} style={{ borderRadius: '50%' }}/> ) : (  <RxAvatar size={20} /> )} </p> ) : (  <p>  <Image 20} height={20} alt='Ligos' src='/images/AI_LOGO.png'/> </p> )} <div className={styles.content}> {pathname.startsWith('/codeGeneration') ? (  <Markdown content={content} /> ) : (   <>{content}</> )} </div> </div> </> ); }; export default Message; ``` So got it ? `useState` than",
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

const CodeForm = () => {
  const [messages, setMessages] = useState<MessageModel[]>(allMessages);
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
    reset()
    sendCode(newMessages);
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

  useEffect(()=>{

    if (!newMessage) return
      let userMessage: MessageModel = {
        role: "user",
        content: getValues("content"),
      };
      setMessages([...messages, userMessage, newMessage]);
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
