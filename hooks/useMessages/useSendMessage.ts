import { useQueryClient, useMutation } from "react-query";
import { MessageModel } from "@/utils/types";
import axios from "axios";


export const useSendMessage = () => useMutation(sendChatMessage,{
  onSuccess: () => {
    const queryClient = useQueryClient()
    // invalidate the query cache for regular chat
    queryClient.invalidateQueries(process.env.CHAT_MESSAGES_QUERY_KEY);
  }
});

export const sendChatMessage = async (messages:MessageModel[]) =>{    
  const {data} = await axios.post<MessageModel>('/api/chat',{messages})  
  return data
}