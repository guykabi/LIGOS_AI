import { NextResponse,NextRequest } from "next/server";
import OpenAI from 'openai';
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next"
import { NextApiRequest, NextApiResponse } from "next";



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
})

const instructionMessage: OpenAI.ChatCompletionAssistantMessageParam = {
  role:"assistant",
  content:"You are a code generator. You must answer only in markdown code snippets . Use code comments for explantions"
}

export async function POST(req: NextRequest, res: NextResponse){
  try{
     const {messages} = await req.json()
     
     const session = await getServerSession( 
      req as unknown as NextApiRequest,
      {
        ...res,
        getHeader: (name: string) => res.headers?.get(name),
        setHeader: (name: string, value: string) => res.headers?.set(name, value),
      } as unknown as NextApiResponse,
      authOptions
      )

      console.log(`Session ${session}`);
      
     
     if(!session){
      return NextResponse.json({message:'Unauthorized'},{status:401})
     }
     
     if(!openai.apiKey){      
      return NextResponse.json({message:'Open Api Key Not Configured'},{status:500})
     }

    //  const response = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages:[instructionMessage,...messages]
    //  });      
   
    //  return NextResponse.json(response.choices[0].message)
    return NextResponse.json({message:'success'})

     
  }catch(error){
    return NextResponse.json({message:'Internal Error'},{status:500})
  }
}