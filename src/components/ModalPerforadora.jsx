import {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import useCondicion from "../hooks/useCondicion"
import ImagenPerforadora from '../assets/img/perforadora.png'
import CerrarBtn from '../assets/img/cerrar.svg'

const Modal = ({setModal,animarModal,setAnimarModal}) => {

  
  const { condicion } = useCondicion()
  const {editarCondicion, eliminarCondicion} = useCondicion()
  const [Rojo , setRojo]= useState(false)
  const [Amarillo , setAmarillo]= useState(false)
  
  const {Nombre, modelo, cantidad, estado, fecha, _id , user} = condicion


  var sectionStyle={
    width: '100%',
    heigth: '100%',
    backgroundImage:`url(${ImagenPerforadora})`,
    alt:"Registrar"
  }
  const Fecha=fecha.toString().split('T')[0]
  const parts = Fecha.split("-");
  const fechaObjeto = new Date(parts[0], parts[1]-1, parts[2]); // los meses para JS comienzan en 0
  
  // Para imprimirlo o obtenerlo en el formato 
  let options = {year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormateada=fechaObjeto.toLocaleDateString('es-ES', options);
  
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

    const ocultarModal=() =>{
      setAnimarModal(false)
      
      setTimeout(() =>{
        setModal(false)
      },500)
    }


  return (
    <>
      <div className="modal flex flex-col h-screen">
        <div className="cerrar-modal ">
          <img src={CerrarBtn} alt="cerrar modal" className="w-5 h-5 md:w-7 md:h-7 hover:cursor-pointer xl:-translate-x-20" onClick={ocultarModal}></img>
        </div>
        <h1 className="text-white text-center mt-24 md:mt-14  text-2xl font-bold uppercase underline underline-offset-8 ">{Nombre}</h1>
      
        <div className="mt-20 w-screen h-screen xl:h-3/4 md:w-1/2 md:mr-0 flex flex-col xl:flex-row xl:ml-60 md:ml-40 2xl:ml-96 ">
            <div className={`formulario ${animarModal ? 'animar' : 'cerrar'} h-screen w-screen px-5 `}>
                <p className="font-bold text-gray-400 mb-5 uppercase">modelo:
                    <span className="font-normal normal-case text-white pl-2">{modelo}</span>
                </p>
                <p className="font-bold text-gray-400 mb-5 uppercase">cantidad:
                    <span className="font-normal normal-case text-white pl-2">{cantidad}</span>
                </p>
                <p className="font-bold text-gray-400 mb-5 uppercase">estado:
                    <span className={`${Amarillo ? 'bg-yellow-500' : 'bg-green-500'}
                                      ${Rojo ? 'bg-red-500' : 'bg-yellow-500'}  
                                      font-normal normal-case text-black ml-2 md:p-1 rounded-lg `}>{estado}</span>
                </p>
                <p className="font-bold text-gray-400 mb-5 uppercase">fecha:
                    <span className="font-normal normal-case text-white pl-2">{fechaFormateada}</span>
                </p>
                <p className="font-bold text-gray-400 mb-12 uppercase">Ingresado por:
                    <span className="font-normal normal-case text-white pl-2">{user}</span>
                </p>
                <div className="flex flex-row">
                  <Link to="/admin/Perforacion/Formulario"><input type="button" value="Editar" className="bg-gradient-to-r from-gray-600 to-gray-700  shadow-sm shadow-gray-600/50  rounded-xl w-40 p-2  font-bold md:text-xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-300 duration-300 mr-5" onClick={() => editarCondicion(condicion)}></input></Link>
                  <input type="button" value="Eliminar" className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-sm shadow-gray-600/50  rounded-xl w-40 p-2  font-bold md:text-xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-300 duration-300 mr-5 " onClick={() => eliminarCondicion(_id)}></input>
                </div>
            </div>
            <div className="bg-center bg-cover  bg-no-repeat w-full hidden xl:block 2xl:-translate-y-28 h-1/2 2xl:h-full"  style={sectionStyle}></div>
        </div>
      </div>
    </>
  )
}

export default Modal

