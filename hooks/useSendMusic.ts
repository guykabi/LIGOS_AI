import { useMutation } from "react-query";
import { FormSchemaType, MusicType } from "@/utils/types";
import axios from "axios";


export const useSendMusic= () => useMutation(sendMusic,{
  // onSuccess: (musicData) => {
  //   // invalidate the query cache for music messages
  //   queryClient.invalidateQueries(process.env.MUSIC_MESSAGES_QUERY_KEY);
  // },
});

export const sendMusic = async (content:FormSchemaType) =>{
  const {data} = await axios.post<MusicType>('/api/music',content)
  return data
}