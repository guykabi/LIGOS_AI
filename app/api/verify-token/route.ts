import { NextResponse, NextRequest } from "next/server";
import connectDB from "../libs/mongodb";
import User from "../libs/models/User";
import { handleHashing } from "../utils";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();

    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "Token must be provided" },
        { status: 400 }
      );
    }

    const hashedToken = handleHashing(token);

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExipry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 404 });
    }

    return NextResponse.json({ message: "Valid token" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
