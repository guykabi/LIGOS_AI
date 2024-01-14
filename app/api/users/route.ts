import { NextResponse, NextRequest } from "next/server";
import connectDB from "../libs/mongodb";
import User from "../libs/models/User";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();

    const body = await req.json();

    if ((!body?.email || !body?.password) && !body.provider) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const user = await User.findOne({ email: body.email });
    
    if (user) {

      if (!body.provider) {

        if(user?.provider.length){
          return NextResponse.json(
            { message: "User is already register with SSO" },
            { status: 409 }
          );
        }

        return NextResponse.json(
          { message: "Email already taken" },
          { status: 409 }
        );
      }

      if (!user.provider.includes(body.provider)) {
        await User.findOneAndUpdate(
          { _id: user._id.toHexString() },
          { $push: { provider: body.provider } }
        );
      }
      
      return NextResponse.json(
        { message: "Existing user connected with provider",user },
        { status: 200 }
      );
    
    }

    if (!body?.provider) {
      const hashPassword = await bcrypt.hash(body.password, 10);
      body.password = hashPassword;
    }

    await User.create(body);

    return NextResponse.json({ message: "User created!",user }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
