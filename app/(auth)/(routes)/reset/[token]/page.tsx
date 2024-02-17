import React from "react";
import { VerifyToken } from "@/actions/auth/verifyToken";
import InvalidToken from "@/components/InvalidToken/invalidToken";
import ResetForm from "@/components/ResetForm/resetForm";

const Reset = async ({ params }: { params: { token: string } }) => {
  const token = params?.token;
  
  try {
    let res = await VerifyToken(token);
  } catch (err) {
    return <InvalidToken />;
  }

  return (
    <>
      <ResetForm token={token} />
    </>
  );
};

export default Reset;
