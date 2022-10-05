import {useState,useEffect,createContext} from 'react'
import clienteAxios from '../config/axios'

const CondicionContext=createContext()

export const CondicionProvider = ({children})=>{
    const [condicion , setCondicion]=useState([])

    useEffect(()=>{
        const obtenerCondiciones = async () => {
            try {
                const token = localStorage.getItem('Mining_token')
                if(!token) return

                const config = {
                  headers:{
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`
                  }
                }
                const{data} = await clienteAxios('/condicion',config)
                setCondicion(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerCondiciones()
    },[])

    const guardarCondicion = async(condicion) => {
        try {
            const token = localStorage.getItem('Mining_token')
            const config ={
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/condicion',condicion,config)

            const { createdAt, updatedAt, __v, ...condicionGuardada} = data
            setCondicion([condicionGuardada,...condicion])
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }
    return (
        <CondicionContext.Provider
            value={{
                condicion,
                guardarCondicion
            }}
        >
            {children}
        </CondicionContext.Provider>
   
    )   
}
  


export default CondicionContext 