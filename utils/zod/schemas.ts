import {z} from 'zod' 


export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export const signUpSchema = z.object({
  fullname: z.string().min(2, "At least 2 characters").max(20, "At most 20 characters"),
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

export const imageFormSchema = z.object({
  prompt:z.string().min(1,{message:'Image prompt is required'}),
  amount:z.string().min(1),
  resolution:z.string().min(1)
})

