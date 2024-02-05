import { useMutation, useQueryClient } from "react-query";
import { DetailsSchemaType } from "@/utils/types";
import axios from "axios";


export const useSendSettings = () => useMutation(sendSettings)

export const sendSettings = async (details:DetailsSchemaType | FormData) =>{    
  const {data} = await axios.put<DetailsSchemaType>('/api/users',details)
  return data
}