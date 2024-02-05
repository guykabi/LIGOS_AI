import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { FormSchemaType } from "@/utils/types";


export const useSendVideo = () => {
  const queryClient = useQueryClient()
  return useMutation(sendVideo,{
  onSuccess: () => {
    // invalidate the query cache for video messages
    queryClient.invalidateQueries(process.env.CODE_MESSAGES_QUERY_KEY);
  },
})};

export const sendVideo = async (content:FormSchemaType) =>{
    
  const {data} = await axios.post<string>('/api/video',content)
  return data
}