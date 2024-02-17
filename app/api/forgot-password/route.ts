import { NextResponse, NextRequest } from "next/server";
import connectDB from "../libs/mongodb";
import User from "../libs/models/User";
import { randomBytes } from "crypto";
import { emailHandler, handleHashing } from "../utils";
import { emailMessageType } from "@/utils/types";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email must be provided" },
        { status: 400 }
      );
    }

    //Check if eail exist - send reset link
    const isEmailExist = await User.findOne({ email: email });

    if (!isEmailExist) {
      return NextResponse.json(
        { message: "Email does not exist" },
        { status: 404 }
      );
    }

    if (!isEmailExist?.password) {
      return NextResponse.json(
        { message: "Provider only account !" },
        { status: 401 }
      );
    }

    const resetToken = randomBytes(20).toString("hex");
    const passwordResetToken = handleHashing(resetToken);

    const passwordResetExpires = Date.now() + +process.env.RESET_TOKEN_EXPIRY!;

    isEmailExist.resetToken = passwordResetToken;
    isEmailExist.resetTokenExipry = passwordResetExpires;

    const resetUrl = `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_BASE_URL_PROD
        : process.env.NEXT_PUBLIC_BASE_URL
    }/reset/${resetToken}`;
    

    let msg: emailMessageType = {
      email,
      name: isEmailExist.name,
      url: resetUrl,
    };

    const result = await emailHandler(msg);

    if (result === "Failed sending email. Try again") {
      return NextResponse.json({ message: result }, { status: 400 });
    }

    await isEmailExist.save();

    return NextResponse.json({ message: "Check your email" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
