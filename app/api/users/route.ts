import { NextResponse, NextRequest } from "next/server";
import connectDB from "../libs/mongodb";
import User, { UserType } from "../libs/models/User";
import bcrypt from "bcryptjs";
import { DetailsSchemaType } from "@/utils/types";
import { handleHashing, handleServerSession } from "../utils"
import { uploadToCloudinary } from "../libs/cloudinary";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();

    const formData: UserType = await req.json();

    if ((!formData?.email || !formData?.password) && !formData.provider) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const user = await User.findOne({ email: formData.email });

    if (user) {
      if (!formData.provider?.length) {
        if (user?.provider?.length) {
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

      if (!user.provider?.includes(formData.provider[0])) {
        await User.findOneAndUpdate(
          { _id: user._id.toHexString() },
          { $push: { provider: formData.provider } }
        );
      }

      return NextResponse.json(
        { message: "Existing user connected with provider", user },
        { status: 200 }
      );
    }

    if (!formData?.provider?.length) {
      const hashPassword = await bcrypt.hash(formData?.password!, 10);
      formData.password = hashPassword;

      formData.freeUses = 0;
      formData.premium = false;
    }

    let newUser = await User.create(formData);

    return NextResponse.json(
      { message: "User created!", newUser },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();

    const formData: any = await req.formData();

    const image: any = formData?.get("image");
    const name: string = formData.get("name");
    const email: string = formData.get("email");

    const session = await handleServerSession(req, res);

    if (image) {
      const cloudinary = await uploadToCloudinary(image);

      if (cloudinary === "Unable to upload image") {
        return NextResponse.json({ message: cloudinary }, { status: 400 });
      }
      
      let body: DetailsSchemaType = { name, email, image: cloudinary?.url };
      const updatedUser = await User.findByIdAndUpdate(session?.user.id, body, {
        new: true,
      });

      return NextResponse.json(updatedUser, { status: 200 });
    }

    let body: DetailsSchemaType = { name, email };

    const updatedUser = await User.findByIdAndUpdate(session?.user.id, body, {
      new: true,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body?.password || !body?.token)
      return NextResponse.json(
        { message: "Password or token wasn't provided" },
        { status: 400 }
      );

    const hashedToken = handleHashing(body.token);

    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword;

    const newPassword = await User.findOneAndUpdate(
      {
        resetToken: hashedToken,
        resetTokenExipry: { $gt: Date.now() },
      },
      {
        password: body.password,
      },
      { new: true }
    );

    //If user try to reset the password after token expired
    if (!newPassword) {
      return NextResponse.json(
        { message: "Unable to reset . Invalid token or expired" },
        { status: 400 }
      );
    }

    if (newPassword?.resetToken && newPassword.resetTokenExipry) {
      newPassword.resetToken = undefined;
      newPassword.resetTokenExipry = undefined;

      await newPassword.save();
    }

    if (newPassword?.password) {
      return NextResponse.json(
        { message: "Password updated successfully" },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
