"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {useRouter} from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchemaType, VideoType } from "@/utils/types";
import { formSchema } from "@/utils/zod/schemas";
import Button from "../Button/Button";
import styles from "./videoForm.module.scss";
import Empty from "../Empty/empty";
import Loader from "../Loader/loader";
import Message from "../ChatForm/Message/message";
import { ErrorHandler } from "../../utils/errorHandler";
import { SpinnerLoader } from "../SpinnerLoader.tsx/spinnerLoader";
import Video from "./Video/video";
import { useSendVideo } from "@/hooks/useSendVideo";
import { usePremiumModal } from "@/hooks/usePremiumModal";
import { ServiceContext } from "@/providers/contextProvider";
import useScrollToView from "@/hooks/useScrollToView";



const VideoForm = () => {

  const [videos, setVideo] = useState<VideoType[]>([]);
  const {question,setQuestion} = useContext(ServiceContext)
  const {refresh} = useRouter()
  const {onOpen} = usePremiumModal()
  const videosRef = useRef<HTMLDivElement>(null)

  useScrollToView(videosRef,videos)

  const {
    mutate: sendVideo,
    data: newVideo,
    isLoading,
    error,
    isSuccess,
  } = useSendVideo();

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
    sendVideo(message);
    setVideo([])
  };


  useEffect(()=>{
    
    if(question.service !== 'Video') return

    let body:FormSchemaType = {
      content:question.message
    }
    
    handleMessage(body)
  },[question])


  const videoContainer = (
    <div className={styles.videos}>
      {isLoading ? <Loader text="Ligos is loading..." /> : null}
      {!videos?.length && !isLoading ? (
        <Empty message="No videos yet..." />
      ) : null}
      {!isLoading && videos?.length
        ? videos.map((m) =>
            m.src ? (
              <Video key={m.src} src={m.src} />
            ) : (
              <Message key={m.content} content={m.content!} role="user" />
            )
          )
        : null}
        <div ref={videosRef}></div>
    </div>
  );

  

  useEffect(() => {

    if(!newVideo)return

    let newV:VideoType = {
      src:newVideo
    }
    
    let userMessage: VideoType = {
      content: getValues("content") || question.message
    };

    setVideo([...videos, userMessage, newV]);
    if(question.message) setQuestion({service:undefined,message:''})
    reset()
    refresh()
  }, [isSuccess]);

  useEffect(()=>{
    if (!error) return 
    reset()
   
    let res = ErrorHandler(error);
    if(res === 'Premuim is required') onOpen();

  },[error])

  return (
    <div className={styles.videoFormWrapper}>
      <form className={styles.form} onSubmit={handleSubmit(handleMessage)}>
        <div
          role="textbox" 
          aria-describedby="Input of the video service"
         className={styles.inputWrapper}>
          <input
            {...register("content")}
            name="content"
            type="text"
            placeholder="Banana eats human"
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
      {videoContainer}
    </div>
  );
};

export default VideoForm;

