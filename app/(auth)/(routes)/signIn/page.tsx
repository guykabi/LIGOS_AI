'use client'

import React from 'react'
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next"
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../api/auth/[...nextauth]/options"
import styles from './signIn.module.scss'
import Button from '@/components/Button/Button'
import { FaGithub, FaGoogle } from 'react-icons/fa'

const SignIn = () => {
  
  return (
    <div className={styles.signInWrapper}>
      <div>
      <Button
      text="Github"
      icon={<FaGithub color='black'/>}
      theme='black'
      width={18}
      onClick={()=>{
        signIn('github',{
          callbackUrl:'/dashboard'
        })
      }}
      />
      </div>
      <div>

      <Button
      text="Google"
      theme='blue'
      icon={<FaGoogle color='green'/>}
      width={18}
      onClick={()=>{
        signIn('google',{
          callbackUrl:'/dashboard'
        })
      }}
      />
      </div>
    </div>
  )
}

export default SignIn