import {React,useState} from 'react'
import Modal from '../Tronadura/ModalTronadura'
import useCondicion from "../../hooks/useCondicion"

const Tronadura = ({tronaduras}) => {
  const {Fecha_programada, createdAt, fecha ,tabla_columna,tabla_contenido,updatedAt,user  } = tronaduras
  const [modal , setModal] = useState(false)
  const [animarModal , setAnimarModal] = useState(false)
  const { obtenerTronadura } = useCondicion(2)

  


  const handleDetalles = (tronadura) =>{
    obtenerTronadura(tronadura)
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    },300)
  
  
  }  
    

  return (
    <div className="flex mt-10 justify-center container">
      {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal}/>}
      <div className="bg-gray-100 ml-1 mr-2 md:w-1/2 px-5 py-4 rounded-xl shadow-md shadow-gray-500">
        <p className="font-bold text-gray-700 m-4">Fecha Programada:
            <span className="font-normal normal-case text-black pl-1">{Fecha_programada}</span>
        </p>
        <p className="font-bold text-gray-700 m-4">Creado el:
            <span className="font-normal normal-case text-black pl-1">{createdAt}</span>
        </p>
        <p className="font-bold text-gray-700 m-4">Ingresado por:
            <span className="font-normal normal-case text-black pl-1">{user}</span>
        </p>

        
        <div className="px-4 md:px-20 mt-5 py-5 flex flex-col items-center">
        <input type="button" value="Ver Detalles" onClick={()=> handleDetalles(tronaduras)} className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-600/50  rounded-xl w-full p-2 md:pr-40 xl:pr-0 font-bold md:text-2xl  text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-300 duration-300"></input>
        </div>
      </div>
    </div>
    
  )
}



export default Tronadura
