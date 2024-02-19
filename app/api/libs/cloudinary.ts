import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file: File) => {
  try {
    if (!file) return;
    const fileBuffer = await file.arrayBuffer();

    let mime = file.type;
    let encoding = "base64";
    let base64Data = Buffer.from(fileBuffer).toString("base64");
    let fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

    const uploadToCloudinary = () => {
      return new Promise<{
        url: string | undefined;
        cloudinary_id: string | undefined;
      }>((resolve, reject) => {
        cloudinary.uploader
          .upload(fileUri, {
            invalidate: true,
          })
          .then((result) => {
            resolve({ url: result?.url, cloudinary_id: result?.public_id });
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    return await uploadToCloudinary();
  } catch (error) {
    return "Unable to upload image";
  }
};
