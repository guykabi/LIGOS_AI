import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10, "Password needs to be at list 10 characters"),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "At least 2 characters")
      .max(14, "At most 14 characters"),
    email: z.string().email(),
    password: z.string().min(10, "Password needs to be at list 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const formSchema = z.object({
  content: z.string(),
});

export const imageFormSchema = z.object({
  prompt: z.string().min(1, { message: "Image prompt is required" }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const detailsFormSchema = z.object({
  name: z
    .string()
    .min(2, "At least 2 characters")
    .max(14, "At most 14 characters"),
  email: z.string().email(),
  image: z
    .any()
    .refine((files) =>  files?.[0]?.size <= MAX_FILE_SIZE || !files.length, `Max file size is 5MB.`
    )
    .refine(
      (files) => files.length && ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type) || !files.length,
          ".jpg, .jpeg, .png and .webp files are accepted."
    ).optional()
});
