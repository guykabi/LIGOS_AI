"use client"

import NetworkError from "@/components/NetworkError/networkError";
import { useEffect, useState } from "react";


type Props = {
  children: React.ReactNode;
}

const getOnLineStatus = () =>
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
        ? navigator.onLine
        : true;

export const NetworkStatus = ({children}:Props) => {
  const [status, setStatus] = useState(getOnLineStatus());
    
  useEffect(() => {
    function changeStatus() {
      setStatus(window.navigator.onLine);
    }
    
    window.addEventListener("online", changeStatus);
    window.addEventListener("offline", changeStatus);
    return () => {
      window.removeEventListener("online", changeStatus);
      window.removeEventListener("offline", changeStatus);
    };
  }, []);
  

   if(!status){
    return (
      <NetworkError/>
    )
   }

  return(
    <>
     {children}
    </>
  )
};