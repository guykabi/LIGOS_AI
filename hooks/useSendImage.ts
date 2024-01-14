import { useMutation } from "react-query";
import axios from "axios";
import { ImageType, ImageSchemaType } from "@/utils/types";


export const useSendImage = () => useMutation(sendImage,{
  // onSuccess: (bookData) => {
  //   // invalidate the query cache for images messages
  //   queryClient.invalidateQueries(process.env.IMAGE_MESSAGES_QUERY_KEY);
  // },
});

export const sendImage = async (values:ImageSchemaType) =>{
  const {data} = await axios.post<ImageType[]>('/api/image',values)
  return data
}