import {useState,useEffect,createContext} from 'react'
import clienteAxios from '../config/axios'


const TronaduraContext=createContext()

export const TronaduraProvider = ({children}) => {

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
        // if(condicion.id){
        //     try {
        //         const {data}= await clienteAxios.put(`/Tronadura/${condicion.id}`,condicion,config)
        //         const condicionActualizado=condicion.map(condicionState => condicionState._id === data._id ? data : condicionState)
        //         setCondicion(condicionActualizado)
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }else{
        //}
    }


    return (
        <TronaduraContext.Provider
        value={{
    
            guardarTronadura,
    
        }}
        >
            {children}
        </TronaduraContext.Provider>

        )   
}



export default TronaduraContext 