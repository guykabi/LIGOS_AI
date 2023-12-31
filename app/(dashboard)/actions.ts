import axios from "axios"; 
import { FieldValues } from "react-hook-form";

export const sendChatMessage = async (message:FieldValues) =>{
    const {data} = await axios.post('/api/chat',{messages:message})
    return data
}

export const sendCodeMessage = async (message:FieldValues) =>{
    const {data} = await axios.post('/api/code',{messages:message})
    return data
}

