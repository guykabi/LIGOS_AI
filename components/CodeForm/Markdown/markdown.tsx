// 'use client'

import React from 'react'
import  styles from './markdown.module.scss'
import ReactMarkdown from 'react-markdown'


const Markdown = ({content}:{content:any}) => {
  return (
   <ReactMarkdown
   className={styles.markdown}
   components={{
    pre:({node,...props})=>(
      <span className={styles.pre}>
        <pre  {...props}/>
      </span>
    ),
    code: ({node,...props})=>(
      <span className={styles.code}>
        <code  {...props}/>
      </span>
    )
   }}
   >
    {content}
   </ReactMarkdown>
  )
}

export default Markdown