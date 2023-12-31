"use client"

import React from 'react'
import styles from './Button.module.scss'
import {experimental_useFormStatus as useFormStatus} from 'react-dom'

type Theme = 'green'|'red'|'black'|'blue'|'purple'|'white';

type IPButton = {
  text:string | JSX.Element
  type?:'submit'|'button'
  icon?:any,
  theme:Theme
  disabled?:boolean
  width?:number
  height?:number,
  role?:React.AriaRole
  ariaLable?:string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}



const Button = ({
  onClick,
  theme,
  text,
  icon,
  type,
  disabled,
  width,
  height,
  role,
  ariaLable
  }:IPButton) => {

    const {pending} = useFormStatus()

  return (

  <button  
  className={styles[theme]}
  style={{height:`${height}rem`}}
  disabled={disabled}
  onClick={onClick}
  type={type}
  role={role}
  aria-label={ariaLable}
  >
    {pending ? 'wait...' :text}
    
    {icon?<p>{icon}</p>:null}
  </button>
  )
}

export default Button