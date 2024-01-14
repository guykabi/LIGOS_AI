import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../libs/mongodb";
import {checkFreeLimit,freeTrialIncrease} from '../libs/apiLimit'


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {

   await connectDB()

    const { messages } = await req.json();

    const session = await getServerSession(
      req as unknown as NextApiRequest,
      {
        ...res,
        getHeader: (name: string) => res.headers?.get(name),
        setHeader: (name: string, value: string) =>
          res.headers?.set(name, value),
      } as unknown as NextApiResponse,
      authOptions
    );
    

    
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    if (!openai.apiKey) {
      return NextResponse.json(
        { message: "Open Api Key Not Configured" },
        { status: 500 }
        );
      }
      
      
      if(!messages){
        return new NextResponse("No prompt was provided",{status:400})
      }   
      
      const freeTrial = await checkFreeLimit(session.user.id)

      if(!freeTrial){
        return NextResponse.json({message:'Free trial has expired'},{status:403})
      }

      await freeTrialIncrease(session.user.id)

    // const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages
    // });
    

    // return NextResponse.json(response.choices[0].message);
    return NextResponse.json('Success sending',{status:200});


  } catch (error) {
    return NextResponse.json(
      { message: "Failed sending message" },
      { status: 500 }
    );
  }
}
