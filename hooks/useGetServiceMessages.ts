import { Service } from "@/app/api/libs/models/Message";
import { MessageModel } from "@/utils/types";
import axios from "axios";
import { useQuery } from "react-query";

export const useGetMessages = (key: string, service: Service) =>
  useQuery([process.env[key]], () => getServiceMessages(service));

export const getServiceMessages = async (service: Service) => {
  if (!service) return;

  const { data } = await axios<MessageModel[]>(
    `/api/${service.toLocaleLowerCase()}`
  );

  return data;
};
