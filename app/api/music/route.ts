import { NextResponse } from "next/server";
import Replicate from 'replicate'
import { checkFreeLimit, freeTrialIncrease } from "../libs/apiLimit";
import Message from "../libs/models/Message";
import { handleServerSession } from "../utils";

const replicate = new Replicate({
  auth:process.env.REPLICATE_API_TOKEN
})


export async function POST(req:any,res:any){
  try{
     const body = await req.json()
     const {content} = body
     
     const session = await handleServerSession(req,res)

     if(!session){
      return NextResponse.json({message:'Unauthorized'},{status:401})
     }
 
     if(!content){
      return new NextResponse("Content is required",{status:400})
     }    
      
    const freeTrial = session?.user?.premium ? true : await checkFreeLimit(session.user.id)


    if(!freeTrial){
      return NextResponse.json({message:'Free trial has expired'},{status:403})
    }

     const response = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: content
        }
      }
    );

    await Message.create({
      content,
      userId:session?.user?.id,
      service:'Music'
    })

    if(!session?.user?.premium){
      await freeTrialIncrease(session.user.id)
    }

     return NextResponse.json(response)
     
  }catch(error){
    return NextResponse.json({message:'Failed sending message',error},{status:500})
  }
}