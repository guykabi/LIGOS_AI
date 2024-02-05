import { NextResponse, NextRequest } from "next/server";
import OpenAI from "openai";
import {
  getServiceMessages,
  handleInsertMessage,
  handleServerSession,
} from "../utils";
import connectDB from "../libs/mongodb";
import { checkFreeLimit, freeTrialIncrease } from "../libs/apiLimit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();

    const { messages } = await req.json();

    const session = await handleServerSession(req, res);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!openai.apiKey) {
      return NextResponse.json(
        { message: "Open Api Key Not Configured" },
        { status: 500 }
      );
    }

    if (!messages) {
      return new NextResponse("No prompt was provided", { status: 400 });
    }

    const freeTrial = session?.user?.premium
      ? true
      : await checkFreeLimit(session.user.id);

    if (!freeTrial) {
      return NextResponse.json(
        { message: "Free trial has expired" },
        { status: 403 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });
    

    await handleInsertMessage(
      messages[messages.length - 1].content,
      session?.user?.id,
      "Chat"
    );

    if (!session.user.premium) {
      await freeTrialIncrease(session.user.id);
    }

    return NextResponse.json(response.choices[0].message);
  

  } catch (error) {
    return NextResponse.json(
      { message: "Failed sending message", error },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const session = await handleServerSession(req, res);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const allMessages = await getServiceMessages(session.user.id, "Chat");

    return NextResponse.json(allMessages, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed sending message", error },
      { status: 500 }
    );
  }
}
