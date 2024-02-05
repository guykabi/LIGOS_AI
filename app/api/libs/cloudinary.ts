import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file: File) => {
  try {
    if (!file) return;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    return new Promise<{
      url: string | undefined;
      cloudinary_id: string | undefined;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, data) => {
          if (error) return reject(error.message);
          return resolve({ url: data?.url, cloudinary_id: data?.public_id });
        })
        .end(buffer);
    });
  } catch (error) {
    throw new Error("Unable to upload image");
  }
};

// export const removeFromCloudinary = async (public_id: string) => {
//   let type = public_id.includes("video");
//   await cloudinary.v2.uploader.destroy(
//     public_id,
//     { resource_type: type ? "video" : "image" },
//     () => {
//       return "Removed successfully";
//     }
//   );
// };
