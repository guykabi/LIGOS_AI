import axios from "axios";

export const VerifyToken = async (token: string) => {
  try {
    const { data } = await axios.post(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_BASE_URL_PROD
          : process.env.NEXT_PUBLIC_BASE_URL
      }/api/verify-token`,
      { token }
    );

    return data;
  } catch (err: any) {
    throw new Error(err);
  }
};
