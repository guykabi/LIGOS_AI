import React from 'react'
import Skeleton from "@mui/material/Skeleton";

type CardLoaderProps = {
  amount:number
}

const SkeletonLoader = ({amount}:CardLoaderProps) => {
  return (
    Array(amount).fill(1).map((card,index)=>(
      <Skeleton key={index} sx={{width:'100%', height:'260px', borderRadius:'0.4em'}} variant="rectangular"/>
    ))
  )
}

export default SkeletonLoader