import User from "./models/User";
import { MAX_FREE_USES } from "./constants";
import { NextResponse } from "next/server";
import connectDB from "./mongodb";

export const freeTrialIncrease = async (userId: string) => {
  try {
    const userUses = await User.findById(userId);
       
    if (userUses?.freeUses !== undefined && userUses?.freeUses < MAX_FREE_USES) {
      const usesCount = await User.findByIdAndUpdate(
        { _id: userId },
        { freeUses: (userUses.freeUses += 1) },
        { new: true }
      );
      return usesCount?.freeUses;
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
};

export const checkFreeLimit = async (userId: string) => {
  try {
    if (!userId) return false;

    const userUses = await User.findById(userId);
    
    if (userUses?.freeUses !== undefined && userUses?.freeUses < MAX_FREE_USES) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
};


export const checkApiLimitCount = async (userId:string) =>{
  try {
    await connectDB()
    
    const userUses = await User.findById(userId);
    
    if (!userUses?.freeUses) {
      return 0
    }
    
    return userUses?.freeUses
    
  } catch (error) {    
    throw new Error('Internal Error')  
  }
}
