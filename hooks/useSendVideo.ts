import { useMutation } from "react-query";
import axios from "axios";
import { FormSchemaType, MessageModel } from "@/utils/types";


export const useSendVideo = () => useMutation(sendVideo,{
  // onSuccess: (videoData) => {
  //   // invalidate the query cache for code messages
  //   queryClient.invalidateQueries(process.env.CODE_MESSAGES_QUERY_KEY);
  // },
});

export const sendVideo = async (content:FormSchemaType) =>{
  const {data} = await axios.post<string>('/api/video',content)
  return data
}