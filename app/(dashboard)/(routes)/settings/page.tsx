import React from 'react'
import styles from '../routesGlobal.module.scss'
import Header from '@/components/Header/header'
import {routes} from '../../../../components/Sidebar/constants'
import {IoSettingsOutline } from "react-icons/io5";
import SettingsForm from '@/components/SettingsForm/settingsForm';

const Settings = () => {

  const settingsCard = routes.find(route =>(
    route.label === 'Settings'
  ))

  return (
    <div className={styles.globalServiceWrapper}>
      <Header
      title={settingsCard?.label!}
      icon={<IoSettingsOutline size={25}/>}
      color={settingsCard?.color}
      />
      
      <SettingsForm/>
      
    </div>
  )
}

export default Settings
