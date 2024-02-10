"use client"

import NetworkError from "@/components/NetworkError/networkError";
import { useEffect, useState } from "react";
import {Detector} from 'react-detect-offline'


type Props = {
  children: any
}

const getOnLineStatus = () =>
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
        ? navigator.onLine
        : true;

export const NetworkStatus = ({children}:Props) => {
  return (
    <>
      <Detector
        render={({ online }) => (
          online ? children : <NetworkError/>
        )}
/>
    </>
  )
};