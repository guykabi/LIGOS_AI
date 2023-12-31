import {toast } from "react-toastify"
import {Toastify} from '../types'
import styles from './toastify.module.scss'


export const handleToast = ({type,text,position}:Toastify) => {
      return toast[type](text,{
        position,
        className:styles.toast,
        toastId:1
      })
}