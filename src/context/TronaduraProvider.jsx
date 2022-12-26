import {useState,useEffect,createContext} from 'react'
import clienteAxios from '../config/axios'


const TronaduraContext=createContext()

export const TronaduraProvider = ({children}) => {

    const [tronaduras , setTronaduras] = useState([])
    const [tronadura , setTronadura]=useState({})

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

    const guardarTronadura = async(tronaduraDoc) => {
        const token = localStorage.getItem('Mining_token')
        const config ={
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }

        if(tronaduraDoc.id)
        {
            try {
                console.log(tronaduraDoc)
                const {data}= await clienteAxios.put(`/Tronadura/${tronaduraDoc.id}`,tronaduraDoc,config)
                const tronaduraActualizado=tronaduraDoc.map(tronaduraState => tronaduraState._id === data._id ? data : tronaduraState)
                setTronadura(tronaduraActualizado)
            }
            catch (error) {
                console.log(error)
            }      

        }
        else
        {
            try {
                const {data} = await clienteAxios.post('/Tronadura',tronaduraDoc,config)
                console.log(data)
                // const { createdAt, updatedAt, __v, ...tronaduraGuardada} = data
                // setCondicion([tronaduraGuardada,...tronaduraDoc]) 
            }
            catch (error) {
                console.log(error)
            }  
        }
    }

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
            tronaduras,
            tronadura,
            guardarTronadura,
            
            obtenerTronadura,
            
            editarTronadura,
            eliminarTronadura
    
        }}
        >
            {children}
        </TronaduraContext.Provider>

        )   
}



export default TronaduraContext 