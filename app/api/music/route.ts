import { NextRequest, NextResponse } from "next/server";
import Replicate from 'replicate'
import { checkFreeLimit, freeTrialIncrease } from "../libs/apiLimit";
import { getServiceMessages, handleInsertMessage, handleServerSession } from "../utils";

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


    await handleInsertMessage(
      content,
      session?.user?.id,
      'Music'
    )

    if(!session?.user?.premium){
      await freeTrialIncrease(session.user.id)
    }

     return NextResponse.json(response)
     
  }catch(error:any){
    
    if(error.response.status < 500){
      return NextResponse.json({ message: 'Unable to send request right now' }, { status: error.response.status });
    }
    
    return NextResponse.json({message:'Internal Error',error},{status:500})
  }
}



export async function GET(req: NextRequest, res: NextResponse) {

  try {
    
    const session = await handleServerSession(req,res)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allMessages = await getServiceMessages(session.user.id,'Music')

    return NextResponse.json(allMessages,{status:200});
 
   }catch(error){
    return NextResponse.json(
      { message: "Internal Error",error },
      { status: 500 }
    );
  }

}

