import { ToastPosition } from 'react-toastify'
import {detailsFormSchema, formSchema, imageFormSchema, signInSchema, signUpSchema} from './zod/schemas' 
import {z} from 'zod'
import { AxiosError } from 'axios'
import { Service } from '@/app/api/libs/models/Message'

export type signInSchemaType = z.infer< typeof signInSchema>
export type SignUpSchemaType = z.infer< typeof signUpSchema>
export type FormSchemaType = z.infer< typeof formSchema> 
export type ImageSchemaType = z.infer< typeof imageFormSchema>
export type DetailsSchemaType = z.infer<typeof detailsFormSchema>
export type ErrorType = typeof AxiosError | Error


export type User = Partial<{
  name:string
  email:string
  password:string
  provider:[string]
  freeUses:number
  premium:boolean
  image:string
}>

export type MessageModel = {
  content:string
  role:'user' | 'assistant'
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


export type ServiceMessage = {
  service?:Service|undefined
  message:string
}

export interface ServiceContextType {
  question: ServiceMessage;
  setQuestion: (question: ServiceMessage) => void;
}





