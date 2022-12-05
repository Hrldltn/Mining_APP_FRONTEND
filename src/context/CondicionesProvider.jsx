import {useState,useEffect,createContext} from 'react'
import clienteAxios from '../config/axios'


const CondicionContext=createContext()

export const CondicionProvider = ({children})=>{

    const [condiciones , setCondiciones]=useState([])
    const [condicionesHoy , setCondicionesHoy]=useState({})
    const [file , setFile]=useState({})
    const [condicion , setCondicion]=useState({})


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
                setCondiciones(data)
           
            } catch (error) {
                console.log(error)
            }
        }
        obtenerCondiciones()
    },[condiciones])

    useEffect(()=>{
        const obtenerCondicionestoday = async () => {
            try {
                const token = localStorage.getItem('Mining_token')
                if(!token) return
                
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const{data} = await clienteAxios('/condicion/today',config)
                setCondicionesHoy(data)
           
            } catch (error) {
                console.log(error)
            }
        }
        obtenerCondicionestoday()
    },[condicionesHoy])

    
    const guardarCondicion = async(condicion) => {
        const token = localStorage.getItem('Mining_token')
        const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
        if(condicion.id){
            try {
                const {data}= await clienteAxios.put(`/condicion/${condicion.id}`,condicion,config)
                const condicionActualizado=condicion.map(condicionState => condicionState._id === data._id ? data : condicionState)
                setCondicion(condicionActualizado)
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const {data} = await clienteAxios.post('/condicion',condicion,config)
                const { createdAt, updatedAt, __v, ...condicionGuardada} = data
                setCondicion([condicionGuardada,...condicion])  
            } catch (error) {
                console.log(error)
            }      
        }
    }

    
    const obtenerCondicion = (condicion) =>{
        setCondicion(condicion)
    }
    const obtenerCondicionesDia = (condicionesHoy) =>{
        setCondicionesHoy(condicionesHoy)
    }

    
    const editarCondicion = (condicion) =>{
        setCondiciones(condicion)
    }


    const eliminarCondicion= async id =>{
        const confirmar = confirm('¿Seguro que deseas eliminar?')

        if(confirmar){
            try{
                const token=localStorage.getItem('Mining_token')
                const config={
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                    }
                 }
                const {data} = await clienteAxios.delete(`/condicion/${id}`,config)
                const condicionActualizado = condiciones.filter(condicionState => condicionState._id!==id)
                setCondiciones(condicionActualizado)
            }catch(error){
                console.log(error)
            }
        }
    }

    return (
        <CondicionContext.Provider
        value={{
            condicion,
            condiciones,
            guardarCondicion,
            obtenerCondicion,
            editarCondicion,
            eliminarCondicion,
            condicionesHoy,
            obtenerCondicionesDia,
        }}
        >
            {children}
        </CondicionContext.Provider>
   
   )   
}



export default CondicionContext 