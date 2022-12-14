import {React,useState,useEffect} from 'react'
import useCondicion from '../../hooks/useCondicion'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import Modal from './ModalPerforadora'
import {GiEyeTarget,GiPencil,GiTrashCan} from 'react-icons/gi'

const PerforadoraHistory = () => {
    const {condiciones , obtenerCondicion ,editarCondicion, eliminarCondicion} = useCondicion(1)
    const [search , setSearch] = useState("")
    const [modal , setModal] = useState(false)
    const [animarModal , setAnimarModal] = useState(false)
    const [fecha , setFecha] = useState([])
    const [mostrarMantencion , setMostrarMantencion]= useState(false)
    const [mostrarMalEstado , setMostrarMalEstado]= useState(false)
    let results=[]
    if(!search){
        results=condiciones
   
    }else{
      
        results=condiciones.filter((dato) => dato.Nombre.toLowerCase().includes(search.toLowerCase().trim()) || 
                                             dato.modelo.toLowerCase().includes(search.toLowerCase().trim()) ||
                                             dato.cantidad.toLowerCase().includes(search.toLowerCase().trim()) ||
                                             dato.estado.toLowerCase().includes(search.toLowerCase().trim()) ||
                                             dato.fecha.toLowerCase().includes(search.toLowerCase().trim()) ||
                                             dato.user.toLowerCase().includes(search.toLowerCase().trim()) ||
                                             dato.observacion.toLowerCase().includes(search.toLowerCase().trim())
                                    )
                                    
           
        }
    

    const handleDetalles = (condicion) =>{
        obtenerCondicion(condicion)
        setModal(true)
    
        setTimeout(() => {
            setAnimarModal(true)
        },300)
        
        }
   
    return (
      
        <>  
            {condiciones.length ? (

            <>
                {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal}/>}
                <h2 className="font-black md:text-3xl text-center text-2xl mt-10 pr-10 md:pr-0">Registro Hist??rico</h2>
                <p className="md:text-xl text-lg mt-5 mb-10 text-center pr-12 md:pr-0">Toda la informaci??n registradas de las{''} <span className="text-amber-600 font-bold">Perforadoras</span> </p>
                <div className={`${modal ? 'hidden':'block'} flex flex-row gap-5 w-full`}>
                    <input value={search} onChange={e => setSearch(e.target.value)} type="text" className="md:w-[40rem] xl:w-[40rem] 2xl:w-[40rem] w-[21rem] rounded-md p-2 pl-2 xl:ml-2 text-lg md:text-xl" placeholder="Busca por Nombre, cantidad, fecha"></input>
                    <HiOutlineSearch size="30" className="mt-1 -translate-x-20 md:-translate-x-20 xl:-translate-x-42  2xl:-translate-x-[6rem] ml-6 text-gray-400"></HiOutlineSearch>
                </div>
                <div className={`${modal ? 'hidden':'block'} flex xl:container justify-center mt-5 rounded-md drop-shadow-2xl md:-translate-x-2 xl:translate-x-3`}>
                    <div className="overflow-x-auto relative rounded-xl  drop-shadow-xl hidden md:block w-full h-full">
                        <table className="w-full md:text-md xl:text-lg text-sm text-left h-max text-gray-500 dark:text-gray-400">
                            <thead className="text-md  uppercase bg-gray-800 text-gray-100">
                                <tr >
                                   <th scope="col" className="py-3 px-4 2xl:px-6">
                                        Nombre
                                    </th>
                                    <th scope="col" className="py-3 px-10 2xl:px-20">
                                        Modelo
                                    </th>
                                    <th scope="col" className="py-3 md:pr-5 pl-10">
                                        Cantidad
                                    </th>
                                    <th scope="col" className="py-3 px-20">
                                        Estado
                                    </th>
                                    <th scope="col" className="py-3 px-6 xl:pr-20">
                                        Fecha
                                    </th>
                                    <th scope="col" className="py-3 md:px-6 xl:px-11 2xl:pl-10">
                                        Autor
                                    </th>
                                    <th scope="col" className="py-3 md:px-6 2xl:pl-20">
                                        observaci??n
                                    </th>
                                    <th scope="col" className="py-3 md:px-6 xl:px-11 2xl:px-10 ">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>

                                
                            <tbody>
                                {results.map(condicion =>(
                                <tr  key={condicion._id}  className="border-b bg-gray-700 border-gray-500">
                                    <td className="py-4 md:px-2 text-center text-gray-100">
                                        {condicion.Nombre}
                                    </td>
                            
                                    <td className="py-4 pb-10 text-center text-gray-100">
                                        {condicion.modelo}      
                                    </td>
                                    <td className="py-4 pb-10 md:px-8 text-center text-gray-100">
                                        {condicion.cantidad}
                                    </td>
                                    <td className="py-4 pb-10 md:px-2 text-center text-gray-100">
                                        {condicion.estado}
                                    </td>
                                    <td className="py-4 pb-10 text-gray-100 px-2 2xl:px-5">
                                        {condicion.fecha.split('T')[0]}
                                    </td>
                                    <td className="py-4 pb-10 md:px-6 text-center text-gray-100">
                                        {condicion.user}
                                    </td>
                                    <td className="py-4 pb-10 md:px-6 2xl:pr-20 text-center text-gray-100">
                                        {condicion.observacion ? condicion.observacion : 'no existe observaci??n'}
                                    </td>
                                    <td className="py-7 md:px-2 2xl:px-0 text-gray-100 flex gap-2" onClick={()=> handleDetalles(condicion)}>
                                        <GiEyeTarget size={26} className="cursor-pointer"/>
                                        <p className="cursor-pointer">Ver Detalles</p>
                                    </td>  
                                   
                                </tr>
                            
                               
                                ))}
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
            </>
            ) : 
            (
                <>
                    <h2 className="font-black text-2xl text-center">No hay informaci??n</h2>
                </> 
            )}
        

        </>
       
       )
    }
    
export default PerforadoraHistory
    
    
