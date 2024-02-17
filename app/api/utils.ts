import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]/options";
import Message, { MessageType, Service } from "./libs/models/Message";
import {send} from '@emailjs/nodejs' 
import { createHash } from "crypto";


export const handleServerSession = async (
  req: NextRequest,
  res: NextResponse
) => {
  const session = await getServerSession(
    req as unknown as NextApiRequest,
    {
      ...res,
      getHeader: (name: string) => res.headers?.get(name),
      setHeader: (name: string, value: string) => res.headers?.set(name, value),
    } as unknown as NextApiResponse,
    authOptions
  );
  return session;
};

export const getServiceMessages = async (userId: string, service: Service) => {
  try {
    return await Message.find({
      userId,
      service,
    }).sort({ updatedAt: -1 });
  } catch (error) {
    throw new Error("Internal Error");
  }
};

export const handleInsertMessage = async (
  content: string,
  userId: string,
  service: Service
) => {
  try {
    let newMessage: MessageType = {
      content,
      userId,
      service,
    };

    const matchingMessages = await Message.find({
      userId,
      service,
    }).sort({ updatedAt: 1 });

    let isQuestionExist = matchingMessages.find(
      (m) => m.content === newMessage.content
    );

    if (isQuestionExist) return true;

    if (matchingMessages.length < 3) {
      await Message.create(newMessage);
      return true;
    } else {
      const oldestDocument = matchingMessages[0];
      await Message.findByIdAndUpdate(
        oldestDocument._id,
        { $set: newMessage },
        { new: true }
      );
      return true;
    }
  } catch (error) {
    throw new Error("Internal Error");
  }
};


export const handleHashing = (token:string) =>{
  return createHash("sha256")
    .update(token)
    .digest("hex");
}


export const emailHandler = async(msg:any) => {
  try{
    const {status,text} = await send(process.env.EMAILJS_SERVICE_ID!, process.env.EMAILJS_TEMPLATE_ID!, msg, {
      publicKey: process.env.EMAILJS_PUBLIC_KEY!,
      privateKey:process.env.EMAILJS_PRIVATE_KEY
    })
     return status
  }catch(err){
    return 'Failed sending email. Try again'
  }
}
