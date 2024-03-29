"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {useRouter} from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaType, MusicType } from "@/utils/types";
import { formSchema } from "@/utils/zod/schemas";
import Button from "../Button/Button";
import styles from "./musicForm.module.scss";
import Empty from "../Empty/empty";
import Loader from "../Loader/loader";
import Message from "../ChatForm/Message/message";
import { ErrorHandler } from "../../utils/errorHandler";
import { SpinnerLoader } from "../SpinnerLoader.tsx/spinnerLoader";
import { useSendMusic } from "@/hooks/useSendMusic";
import Audio from "./Audio/audio";
import { usePremiumModal } from "@/hooks/usePremiumModal";
import { ServiceContext } from "@/providers/contextProvider";
import useScrollToView from "@/hooks/useScrollToView";


const MusicForm = () => {
  const [music, setMusic] = useState<MusicType[]>([]);
  const {question,setQuestion} = useContext(ServiceContext)
  const {refresh} = useRouter()
  const {onOpen} = usePremiumModal()
  const musicRef = useRef<HTMLDivElement>(null)

  useScrollToView(musicRef,music)


  const {
    mutate: sendMusic,
    data: newMusic,
    isLoading,
    error,
    isSuccess,
  } = useSendMusic();

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
    sendMusic(message);
    setMusic([])
  };


  useEffect(()=>{
    
    if(question.service !== 'Music') return

    let body:FormSchemaType = {
      content:question.message
    }
    
    handleMessage(body)
  },[question])


  const musicContainer = (
    <div className={styles.sounds}>
      {isLoading ? <Loader text="Ligos is loading..." /> : null}
      {!music?.length && !isLoading ? (
        <Empty message="No music yet..." />
      ) : null}
      {!isLoading && music?.length
        ? music.map((m) =>
            m.audio ? (
              <Audio key={m.spectrogram} audio={m.audio} />
            ) : (
              <Message key={m.content} content={m.content!} role="user" />
            )
          )
        : null}
        <div ref={musicRef}></div>
    </div>
  );


  useEffect(() => {

    if(!newMusic)return
    
    let userMessage: MusicType = {
      content: getValues("content") || question.message,
    };

    setMusic([...music, userMessage, newMusic]);
    if(question.message) setQuestion({service:undefined,message:''})
    reset()
    refresh()
    
  }, [isSuccess]);

  useEffect(()=>{
    if(!error) return
    reset()

    let res = ErrorHandler(error);
    if(res === 'Premuim is required') onOpen()
    
  },[error])

  return (
    <div className={styles.musicFormWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(handleMessage)}>
        <div
          role="textbox" 
          aria-describedby="Input of the music service"
         className={styles.inputWrapper}>
          <input
            {...register("content")}
            name="content"
            type="text"
            placeholder="Bach symphony"
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
      {musicContainer}
    </div>
  );
};

export default MusicForm;
