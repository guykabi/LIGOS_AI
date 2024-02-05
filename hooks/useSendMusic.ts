import { useMutation, useQueryClient } from "react-query";
import { FormSchemaType, MusicType } from "@/utils/types";
import axios from "axios";


export const useSendMusic = () => {
  const queryClient = useQueryClient()
  return useMutation(sendMusic,{
  onSuccess: () => {
    // invalidate the query cache for music messages
    queryClient.invalidateQueries(process.env.MUSIC_MESSAGES_QUERY_KEY);
  },
})};

export const sendMusic = async (content:FormSchemaType) =>{
  const {data} = await axios.post<MusicType>('/api/music',content)
  return data
}