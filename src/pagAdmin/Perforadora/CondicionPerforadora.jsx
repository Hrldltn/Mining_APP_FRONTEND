import{ useState ,useEffect} from 'react'

import Modal from './ModalPerforadora'
import useCondicion from "../../hooks/useCondicion"

const Condicion = ({condicion}) => {
  const {Nombre, modelo, fecha ,estado} = condicion
  const [modal , setModal] = useState(false)
  const [animarModal , setAnimarModal] = useState(false)
  const { obtenerCondicion } = useCondicion(1)
  const [Rojo , setRojo]= useState(false)
  const [Amarillo , setAmarillo]= useState(false)
 
  useEffect(()=>{
    const verCondicion = () =>{
        if(estado == 'En Mantencion'){
          setAmarillo(true)
      
        }
    
        if(estado == 'Mal Estado'){
          setRojo(true)
        }
      }
      verCondicion()
  },[])

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
        <p className="font-bold text-gray-700 m-4">Fecha ingreso:
            <span className="font-normal normal-case text-black pl-1">{fechaFormateada}</span>
        </p>
        <p className="font-bold text-gray-700 m-4">Nombre:
            <span className="font-normal normal-case text-black pl-1">{Nombre}</span>
        </p>
        <p className="font-bold text-gray-700 mx-4">Modelo:
            <span className="font-normal normal-case text-black pl-1">{modelo}</span>
        </p>

        <div className="relative -translate-y-32">
          <span className={`absolute top-0 right-0 -mr-1 w-4 h-4 rounded-full ${Amarillo ? 'bg-yellow-500 ' : 'bg-green-500'}
                                      ${Rojo ? 'bg-red-500' : 'bg-yellow-500'} ${modal ? 'hidden' : 'animate-[ping_2s_infinite]' }`}></span>
          <span className="absolute top-0 right-0 -mr-1 w-4 h-4 rounded-full ${Amarillo ? 'bg-yellow-500 ' : 'bg-green-500'}
                                      ${Rojo ? 'bg-red-500' : 'bg-yellow-500'}"></span>
          {/* <p className="float-right translate-y-3 font-bold text-gray-700 bg-gray-300 rounded-lg p-2">{estado}</p> */}
        </div>
        <div className="px-4 md:px-20 mt-5 py-5 flex flex-col items-center">
        <input type="button" value="Ver Detalles" onClick={()=> handleDetalles(condicion)} className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-600/50  rounded-xl w-full p-2 md:pr-40 xl:pr-0 font-bold md:text-2xl  text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-300 duration-300"></input>
        </div>
      </div>
    </div>
    
  )
}

export default Condicion
