import {useState,useEffect,createContext} from 'react'
import clienteAxios from '../config/axios'


const CondicionContext=createContext()

export const CondicionProvider = ({children})=>{

    const [condiciones , setCondiciones]=useState([])
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
                console.log(error.response.data.msg)
            }      
        }
    }
    
    const obtenerCondicion = (condicion) =>{
        setCondicion(condicion)
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
                const condicionActualizado = pacientes.filter(condicionState => condicionState._id!==id)
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
            eliminarCondicion
        }}
        >
            {children}
        </CondicionContext.Provider>
   
   )   
}



export default CondicionContext 