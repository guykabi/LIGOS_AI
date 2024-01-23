import { MessageModel } from "@/utils/types";
import axios from "axios";
import { useQuery } from "react-query";

export const useGetMessages = () =>
  useQuery([process.env.CHAT_MESSAGES_QUERY_KEY], getChatMessages,{
    enabled:false
  });

export const getChatMessages = async () => {  
  const { data } = await axios<MessageModel[]>("/api/chat");
  return data;
};
