import {useState,useEffect,createContext} from 'react'
import clienteAxios from '../config/axios'


const MantencionContext=createContext()

export const MantencionProvider = ({children})=>{

    const [mantencion , setMantencion]=useState([])
    const [mantenciones , setMantenciones]=useState([])

    useEffect(()=>{
        const obtenerMantencion = async () => {
            try {
                const token = localStorage.getItem('Mining_token')
                if(!token) return
                
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const{data} = await clienteAxios('/Mantencion/${mantencion.id}',config)
                setMantenciones(data)
           
            } catch (error) {
                console.log(error)
            }
        }
        obtenerMantencion()
    },[mantencion])

    const guardarMatencion = async(mantencion) => {
        const token = localStorage.getItem('Mining_token')
        const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
        if(mantencion.id){
            try {
                const {data}= await clienteAxios.put(`/Mantencion/${mantencion.id}`,mantencion,config)
                const mantencionActualizada=mantencion.map(mantencionState => mantencionState._id === data._id ? data : mantencionState)
                setMantencion(mantencionActualizada)
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const {data} = await clienteAxios.post('/Mantencion',mantencion,config)
                const { createdAt, updatedAt, __v, ...mantencionGuardada} = data
            
                setMantencion([mantencionGuardada,...mantencion])
            } catch (error) {
                console.log(error)
            }      
        }
    }
    console.log(mantencion)

    return (
        <MantencionContext.Provider
        value={{
            guardarMatencion,
            mantencion,
            mantenciones
        }}
        >
            {children}
        </MantencionContext.Provider>
   )   

}

export default MantencionContext 