import { NextResponse,NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next"
import Replicate from 'replicate'
import { NextApiRequest, NextApiResponse } from "next";
import { checkFreeLimit, freeTrialIncrease } from "../libs/apiLimit";

const replicate = new Replicate({
  auth:process.env.REPLICATE_API_TOKEN
})


export async function POST(req:any,res:any){
  try{
     const body = await req.json()
     const {content} = body
     
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

  
     
     if(!session){
      return NextResponse.json({message:'Unauthorized'},{status:401})
     }
 
     if(!content){
      return new NextResponse("Content is required",{status:400})
     }    

     const freeTrial = session.data.premium ? true : await checkFreeLimit(session.user.id)

     if(!freeTrial){
       return NextResponse.json({message:'Free trial has expired'},{status:403})
     }

     const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt:content
        }
      }
    );
    
    if(!session.data.premium){
      let count = await freeTrialIncrease(session.user.id)
      return NextResponse.json({response,count})
    }
     
     return NextResponse.json(response)
     
  }catch(error){
    return NextResponse.json({message:'Failed sending message',error},{status:500})
  }
}

