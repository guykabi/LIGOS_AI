import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { MessageModel } from "@/utils/types";


export const useSendCode = () => {
  const queryClient = useQueryClient();
  return useMutation(sendCode,{
  onSuccess: () => {
    // invalidate the query cache for code messages
    queryClient.invalidateQueries(process.env.CODE_MESSAGES_QUERY_KEY);
  },
})};

export const sendCode = async (messages:MessageModel[]) =>{
  const {data} = await axios.post<MessageModel>('/api/code',{messages})
  return data
}