import axios from "axios"
import { useMutation } from "react-query";

export const SendEmail = () => {
  return useMutation(sendResetEmail)
};

export const sendResetEmail = async (email:string) =>{
  const {data} = await axios.post('/api/forgot-password',{email})
  return data
}