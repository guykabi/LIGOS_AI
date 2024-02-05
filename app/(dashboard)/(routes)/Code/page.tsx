import React from 'react'
import global from '../routesGlobal.module.scss'
import Header from '@/components/Header/header'
import CodeForm from '@/components/CodeForm/codeForm'
import { Cards } from '@/components/Card/constants'
import { FaCode } from "react-icons/fa";
import { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Code Generation',
};


const Code = () => {
  const codeCard = Cards.find(c=> c.title.startsWith('Code'))

  return (
    <div className={global.globalServiceWrapper}>
      <Header
      title={codeCard?.title!}
      description={codeCard?.content!}
      icon={<FaCode size={30}/>}
      color={codeCard?.color}
      />
      <CodeForm/>
    </div>
  )
}

export default Code
