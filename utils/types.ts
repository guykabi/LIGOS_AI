import { ToastPosition } from 'react-toastify'
import {formSchema, signUpSchema} from './zod/schemas' 
import {z} from 'zod'
import { AxiosError } from 'axios'

export type SignUpSchema = z.infer< typeof signUpSchema> 
export type FormSchemaType = z.infer< typeof formSchema> 
export type ErrorType = typeof AxiosError | Error

export type MessageModel = {
  id?:string | number
  content:string
  role:'user' | 'system'
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





