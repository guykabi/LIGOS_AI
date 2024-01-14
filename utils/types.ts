import { ToastPosition } from 'react-toastify'
import {formSchema, imageFormSchema, signUpSchema} from './zod/schemas' 
import {z} from 'zod'
import { AxiosError } from 'axios'

export type SignUpSchema = z.infer< typeof signUpSchema> 
export type FormSchemaType = z.infer< typeof formSchema> 
export type ImageSchemaType = z.infer< typeof imageFormSchema>
export type ErrorType = typeof AxiosError | Error


export type User = Partial<{
  fullname:string
  email:string
  password:string
  provider:[string]
  freeUses:number
  premium:boolean
  image:string
}>

export type MessageModel = {
  content:string
  role:'user' | 'system'
}

export type ImageType = {
  url: string;
};

export type MusicType = {
  audio?: string;
  spectrogram?:string
  content?: string;
}

export type VideoType = {
  src?:string
  content?:string
}




export type ServiceCard = {
  title:string
  content:string
  color?:string
  href:string
} 

export type Toastify = {
  type: 'error' | 'warning' | 'success'
  text:string
  position: ToastPosition
}





