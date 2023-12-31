'use client'

import { isAxiosError } from "axios"
import { handleToast } from "./Toastify/toastify"

export const ErrorHandler = (error: any) => {

  if (isAxiosError(error)) {
    
    if (error.response?.status! < 500) {
      
      handleToast({
        type: 'error',
        text: error?.response?.data.message ?
          error?.response?.data.message : 'Error',
        position: 'top-center'
      })
    } else {      
      throw new Error(error.response?.data.message)
    }
  } else {
    throw new Error('Something went wrong')
  }

}