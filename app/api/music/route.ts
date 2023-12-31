// import { NextResponse,NextRequest } from "next/server";
// import OpenAI from 'openai';
// import { authOptions } from "../auth/[...nextauth]/options";
// import { getServerSession } from "next-auth/next"



// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY 
// })

// export async function POST(req:any,res:any){
//   try{
//      const {messages} = await req.json()
     
//      const session = await getServerSession(req, res, authOptions)
     
//      if(!session){
//       return NextResponse.json({message:'Unauthorized'},{status:401})
//      }
     
//      if(!openai.apiKey){      
//       return NextResponse.json({message:'Open Api Key Not Configured'},{status:500})
//      }

//      const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages
//      });
     
   
//      return NextResponse.json(response.choices[0].message)
     
//   }catch(error){
//     return NextResponse.json({message:'Failed sending message'},{status:500})
//   }
// }