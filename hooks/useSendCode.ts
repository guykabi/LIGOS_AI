import { useMutation } from "react-query";
import axios from "axios";
import { MessageModel } from "@/utils/types";


export const useSendCode = () => useMutation(sendCode,{
  // onSuccess: (bookData) => {
  //   // invalidate the query cache for code messages
  //   queryClient.invalidateQueries(process.env.CODE_MESSAGES_QUERY_KEY);
  // },
});

export const sendCode = async (message:MessageModel[]) =>{
  const {data} = await axios.post<MessageModel>('/api/code',{messages:message})
  return data
}