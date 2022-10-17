import{ useState } from 'react'

import Modal from './ModalPerforadora'
import useCondicion from "../hooks/useCondicion"

const Condicion = ({condicion}) => {
  const {Nombre, modelo, fecha} = condicion
  const [modal , setModal] = useState(false)
  const [animarModal , setAnimarModal] = useState(false)
  const { obtenerCondicion } = useCondicion()
 

  const handleDetalles = (condicion) =>{
    obtenerCondicion(condicion)
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    },300)
    
  }  
  
  const Fecha=fecha.toString().split('T')[0]
  const parts = Fecha.split("-");
  const fechaObjeto = new Date(parts[0], parts[1]-1, parts[2]); // los meses para JS comienzan en 0
 
    // Para imprimirlo o obtenerlo en el formato 
  let options = {year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormateada=fechaObjeto.toLocaleDateString('es-ES', options);

  
  return (
    <div className="flex mt-10 justify-center container">
      {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal}/>}
      <div className="bg-gray-100 ml-1 mr-2 md:w-1/2 px-5 py-4 rounded-xl shadow-md shadow-gray-500">
        <p className="font-bold text-amber-600 m-4">Fecha ingreso:
            <span className="font-normal normal-case text-black pl-1">{fechaFormateada}</span>
        </p>
        <p className="font-bold text-amber-600 m-4">Nombre:
            <span className="font-normal normal-case text-black pl-1">{Nombre}</span>
        </p>
        <p className="font-bold text-amber-600 mx-4">Modelo:
            <span className="font-normal normal-case text-black pl-1">{modelo}</span>
        </p>
        <div className="px-4 md:px-20 mt-5 py-5 flex flex-col items-center">
          <input type="button" value="Ver Detalles" onClick={()=> handleDetalles(condicion)} className="bg-gradient-to-r from-amber-600 to-amber-700 shadow-lg shadow-amber-600/50  rounded-xl w-full p-2 md:pr-40 xl:pr-0 font-bold md:text-2xl  text-lg text-white hover:cursor-pointer  hover:shadow-amber-400 hover:text-gray-300 duration-300"></input>
        </div>
      </div>
    </div>
    
  )
}

export default Condicion
