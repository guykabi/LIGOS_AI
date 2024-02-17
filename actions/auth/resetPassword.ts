import axios from "axios";
import { useMutation } from "react-query";

export const ResetPassword = () => {
  return useMutation(sendResetPassword);
};

export const sendResetPassword = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  const { data } = await axios.patch("/api/users", { password, token });
  return data;
};
