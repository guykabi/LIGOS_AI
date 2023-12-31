import {ClipLoader} from 'react-spinners'

type SpinnerProps = {
  size?:number 
  color?: 'gray' | 'black' | 'white'
}

export const SpinnerLoader = ({size=25,color='gray'} :SpinnerProps)=>{

   return( 
      <ClipLoader
            color={color}
            size={size}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
} 