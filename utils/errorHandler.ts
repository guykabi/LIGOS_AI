'use client'

import { isAxiosError } from "axios"
import { handleToast } from "../providers/Toastify/toastify"

export const ErrorHandler = (error: any) => {


  if (isAxiosError(error)) {
    
    if (error.response?.status! < 500) {
      
     if(error.response?.status === 403){
         return 'Premuim is required'
     }

      handleToast({
        type: 'error',
        text: error?.response?.data.message ?
          error?.response?.data.message : 'Error',
        position: 'top-center'
      })
    } else {      
      throw new Error(error.response?.data.message)
    }
    
  }
  else if(typeof error === 'string'){
    handleToast({
      type: 'error',
      text: error,
      position: 'top-center'
    })
  }
   else {
    throw new Error('Something went wrong')
  }

}