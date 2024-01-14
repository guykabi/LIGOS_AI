import { useQueryClient, useMutation } from "react-query";
import { MessageModel } from "@/utils/types";
import axios from "axios";
import { ErrorHandler } from "@/utils/errorHandler";

// const queryClient = useQueryClient()

export const useSendMessage = () => useMutation(sendChatMessage,{
  // onSuccess: (bookData) => {
  //   // invalidate the query cache for regular chat
  //   queryClient.invalidateQueries(process.env.CHAT_MESSAGES_QUERY_KEY);
  // },zz
});

export const sendChatMessage = async (message:MessageModel[]) =>{
  const {data} = await axios.post<MessageModel>('/api/chat',{messages:message})  
  return data
}