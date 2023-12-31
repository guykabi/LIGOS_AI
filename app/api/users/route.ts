import { NextResponse,NextRequest } from "next/server"; 
import User from "@/models/User"; 
import bcrypt from 'bcrypt'

export async function POST(req:NextRequest,res:NextResponse){
  try{    
    const body = await req.json()

   if(!body.email || !body.password){
    return NextResponse.json({message:'Missing fields'},{status:400})
   }

   const isExist = await User.findOne({email:body.email}).lean()

   if(isExist){
    return NextResponse.json({message:'Email already taken'},{status:409})
   } 

   const hashPassword = await bcrypt.hash(body.password,10)
   body.password = hashPassword

    await User.create(body)

    return NextResponse.json({message:'User created!'})
  }
  catch(err){
   return NextResponse.json({message:'Error',err},{status:500})
  }
}