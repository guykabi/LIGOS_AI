// 'use client'

import React, { useState } from 'react'
import  styles from './markdown.module.scss'
import ReactMarkdown from 'react-markdown'
import { IoCopy,IoCopyOutline } from "react-icons/io5";


const Markdown = ({content}:{content:string}) => {
  const [isCopied,setIsCopied]=useState<boolean>()

  const copyToClipboard = (e:any) => {
    navigator.clipboard.writeText(e)
    if(!isCopied)setIsCopied(true)
  }
  
  return (
   <ReactMarkdown
   className={styles.markdown}
   components={{
    code(props) {
      const {children, className, node, ...rest} = props
      const match = /language-(\w+)/.exec(className || '')
      return match ? (
        <code {...rest} className={styles.code}>
          <p className={styles.copyIcon} onClick={()=>copyToClipboard(children)}>
           {isCopied ? <IoCopy size={15} color="black"/> : <IoCopyOutline size={15} color="black"/>}
          </p>
          {children}
        </code>
      ) : (
        <code {...rest} style={{fontWeight:'600'}}>
          `{children}`
        </code>
      )
    }
   }}
   >
    {content}
   </ReactMarkdown>
  )
}

export default Markdown