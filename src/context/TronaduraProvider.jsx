import {useState,useEffect,createContext} from 'react'
import clienteAxios from '../config/axios'


const TronaduraContext=createContext()

export const TronaduraProvider = ({children}) => {

    const [tronaduras , setTronaduras]=useState([])
    const [tronadura , setTronadura]=useState({})
    
    const guardarTronadura = async(tronaduraDoc) => {
        const token = localStorage.getItem('Mining_token')
        const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
        try {
            const {data} = await clienteAxios.post('/Tronadura',tronaduraDoc,config)
            console.log(data)
            // const { createdAt, updatedAt, __v, ...tronaduraGuardada} = data
            // setCondicion([tronaduraGuardada,...tronaduraDoc])  
        } catch (error) {
            console.log(error)
        }      
    }

    useEffect(()=>{
        const obtenerTronadura = async () => {
            try {
                const token = localStorage.getItem('Mining_token')
                if(!token) return
                
                const config = {
                    headers:{
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const{data} = await clienteAxios('/Tronadura',config)
                setTronaduras(data)
           
            } catch (error) {
                console.log(error)
            }
        }
        obtenerTronadura()
    },[tronadura])

    const obtenerTronadura = (tronadura) =>{
        setTronadura(tronadura)
    }
    const editarTronadura = (tronadura) =>{
        setTronaduras(tronadura)
    }


    const eliminarTronadura= async id =>{
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
                const {data} = await clienteAxios.delete(`/Tronadura/${id}`,config)
                const tronaduraActualizado = tronaduras.filter(condicionState => condicionState._id!==id)
                setTronaduras(tronaduraActualizado)
            }catch(error){
                console.log(error)
            }
        }
    }


    return (
        <TronaduraContext.Provider
        value={{
    
            guardarTronadura,
            tronaduras,
            obtenerTronadura,
            tronadura,
            editarTronadura,
            eliminarTronadura
    
        }}
        >
            {children}
        </TronaduraContext.Provider>

        )   
}



export default TronaduraContext 