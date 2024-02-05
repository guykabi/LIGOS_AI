import axios from "axios"; 
import {FieldValues} from 'react-hook-form'

export const handleRegister = async (user:FieldValues) =>{  
    const {data} = await axios.post('/api/users',user)
    return data
}