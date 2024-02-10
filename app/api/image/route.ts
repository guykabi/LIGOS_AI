import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
import connectDB from "../libs/mongodb";
import { checkFreeLimit, freeTrialIncrease } from "../libs/apiLimit";
import Message from "../libs/models/Message";
import { getServiceMessages, handleInsertMessage, handleServerSession } from "../utils";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {

    await connectDB()

    const body = await req.json();
    
    const { prompt, amount = 1, resolution = "512x512" } = body;

    const session = await handleServerSession(req,res)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!openai.apiKey) {
      return NextResponse.json(
        { message: "Open Api Key Not Configured" },
        { status: 500 }
      );
    }

    if(!prompt || !amount || !resolution){
      return new NextResponse("Missing fields",{status:400})
     }    

    const freeTrial = session?.user?.premium ? true : await checkFreeLimit(session.user.id)

    if(!freeTrial){
      return NextResponse.json({message:'Free trial has expired'},{status:403})
    }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution
    });

    await handleInsertMessage(
      prompt,
      session?.user?.id,
      'Image'
    )

    
    if(!session?.user?.premium){
      await freeTrialIncrease(session.user.id)
    }


    return NextResponse.json(response.data);

  } catch (error:any){
    
    if(error?.status < 500){
      return NextResponse.json({ message: error?.error?.message }, { status: error.status });
    }
    return NextResponse.json({ message: "Internal Error",error }, { status: 500 });
  }
}



export async function GET(req: NextRequest, res: NextResponse) {

  try {
    
    const session = await handleServerSession(req,res)

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allMessages = await getServiceMessages(session.user.id,'Image')

    return NextResponse.json(allMessages,{status:200});
 
   }catch(error){
    return NextResponse.json(
      { message: "Internal Error",error },
      { status: 500 }
    );
  }

}


