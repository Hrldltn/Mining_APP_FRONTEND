import {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import useCondicion from "../../hooks/useCondicion"
import CerrarBtn from '../../assets/img/cerrar.svg'

const Modal = ({setModal,animarModal,setAnimarModal}) => {
    const { tronadura,editarTronadura, eliminarTronadura } = useCondicion(2)
    const {Fecha_programada, createdAt, fecha ,tabla_columna,tabla_contenido,updatedAt,user,_id } = tronadura
    const ocultarModal=() =>{
        setAnimarModal(false)
        
        setTimeout(() =>{
          setModal(false)
        },500)
      }
    return(
        <div className="modal flex flex-col h-screen">
            <div className='overflow-y-auto'>
                <div className="cerrar-modal ">
                    <img src={CerrarBtn} alt="cerrar modal" className="w-5 h-5 md:w-7 md:h-7 hover:cursor-pointer xl:-translate-x-20" onClick={ocultarModal}></img>
                </div>
                
                <div className="mt-20 w-screen h-screen xl:h-3/4 md:w-1/2 md:mr-0 flex flex-col xl:flex-row xl:ml-60 md:ml-40 2xl:ml-96 ">
                    <div className={`formulario ${animarModal ? 'animar' : 'cerrar'} h-screen w-screen px-5 `}>
                    <p className="font-bold text-gray-700 m-4">Fecha Programada:
                        <span className="font-normal normal-case text-white pl-1"> {Fecha_programada}</span>
                    </p>
                    <p className="font-bold text-gray-700 m-4">Creado el:
                        <span className="font-normal normal-case text-white pl-1"> {createdAt}</span>
                    </p>
                    <p className="font-bold text-gray-700 m-4">Fecha:
                        <span className="font-normal normal-case text-white pl-1"> {fecha}</span>
                    </p>
                    <p className="font-bold text-gray-700 m-4">Tabla Columna:
                        <span className="font-normal normal-case text-white pl-1"> {tabla_columna}</span>
                    </p>
                    <p className="font-bold text-gray-700 m-4">Tabla de Contenido:
                        <span className="font-normal normal-case text-white pl-1"> {tabla_contenido}</span>
                    </p>
                    <p className="font-bold text-gray-700 m-4">upgrade:
                        <span className="font-normal normal-case text-white pl-1"> {updatedAt}</span>
                    </p>
                    <p className="font-bold text-gray-700 m-4">Ingresado por:
                        <span className="font-normal normal-case text-white pl-1"> {user}</span>
                    </p>
                        <div className="flex flex-row">
                        <Link to="/admin/Perforacion/Formulario"><input type="button" value="Editar" className="bg-gradient-to-r from-gray-600 to-gray-700  shadow-sm shadow-gray-600/50  rounded-xl w-40 p-2  font-bold md:text-xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-300 duration-300 mr-5" onClick={() => editarTronadura(tronadura)}></input></Link>
                        <input type="button" value="Eliminar" className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-sm shadow-gray-600/50  rounded-xl w-40 p-2  font-bold md:text-xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-300 duration-300 mr-5 " onClick={() => eliminarTronadura(_id)}></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Modal