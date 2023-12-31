import {z} from 'zod' 

export const signUpSchema = z.object({
  fullname: z.string().min(2, "At least 2 characters").max(10, "At most 10 characters"),
  email: z.string().email() ,
  password: z.string().min(10,'Password needs to be at list 10 characters'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword ,{
  message:"Passwords must match",
  path:["confirmPassword"]
}) 

export const formSchema = z.object({
  content: z.string()
})