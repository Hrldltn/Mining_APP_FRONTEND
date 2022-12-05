import {React,useState,useEffect} from 'react'
import {useCondicion} from '../../hooks/useCondicion'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import Modal from './ModalPerforadora'

const PerforadoraHistory = () => {
    const {condiciones} = useCondicion()
    const { obtenerCondicion } = useCondicion()

    const [search , setSearch] = useState("")
    const {editarCondicion, eliminarCondicion} = useCondicion()
    const [modal , setModal] = useState(false)
    const [animarModal , setAnimarModal] = useState(false)
    const [fecha , setFecha] = useState([])

    let results=[]
    if(!search){
        results=condiciones
   
    }else{
      
        results=condiciones.filter((dato) => dato.Nombre.toLowerCase().includes(search.toLowerCase().trim()) || 
                                             dato.modelo.toLowerCase().includes(search.toLowerCase().trim()) ||
                                             dato.cantidad.toLowerCase().includes(search.toLowerCase().trim()) ||
                                             dato.estado.toLowerCase().includes(search.toLowerCase().trim()) ||
                                             dato.fecha.toLowerCase().includes(search.toLowerCase().trim()) ||
                                             dato.user.toLowerCase().includes(search.toLowerCase().trim())
                                    )
                                    
           
        }

    const handleDetalles = (condicion) =>{
        obtenerCondicion(condicion)
        setModal(true)
    
        setTimeout(() => {
            setAnimarModal(true)
        },300)
        
        }

   

    // useEffect(() => {
    //     condiciones.forEach(element =>{
    //         const Fecha=element.fecha.toString().split('T')[0]
    //         fecha.push(Fecha)
    //         setFecha(fecha)
    //         // const parts = Fecha.split("-");
    //         // const fechaObjeto = new Date(parts[0], parts[1]-1, parts[2]); // los meses para JS comienzan en 0
            
    //         // //     // Para imprimirlo o obtenerlo en el formato 
    //         // let options = {year: 'numeric', month: 'long', day: 'numeric' };
    //         // const fechaFormateada=fechaObjeto.toLocaleDateString('es-ES', options);
    //         // setFecha(fechaFormateada)
           
    //     })
      
    // }, []);
   
    return (
      
        <>  
            {condiciones.length ? (

            <>
                {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal}/>}
                <h2 className="font-black md:text-3xl text-center text-2xl mt-10 pr-10 md:pr-0">Registro Histórico</h2>
                <p className="md:text-xl text-lg mt-5 mb-10 text-center pr-12 md:pr-0">Toda la información registradas de las{''} <span className="text-amber-600 font-bold">Perforadoras</span> </p>
                <div className={`${modal ? 'hidden':'block'} flex flex-row gap-5 w-full`}>
                    <input value={search} onChange={e => setSearch(e.target.value)} type="text" className="md:w-[40rem] xl:w-[40rem] 2xl:w-[40rem] w-[21rem] rounded-md p-2 pl-2 xl:ml-2 text-lg md:text-xl" placeholder="Busca por Nombre, cantidad, fecha"></input>
                    <HiOutlineSearch size="30" className="mt-1 -translate-x-20 md:-translate-x-20 xl:-translate-x-42  2xl:-translate-x-[6rem] ml-6 text-gray-400"></HiOutlineSearch>
                </div>
                <div className={`${modal ? 'hidden':'block'} flex xl:container justify-center mt-5 rounded-md drop-shadow-2xl md:-translate-x-2 xl:translate-x-3`}>
                    <div className="overflow-x-auto relative rounded-xl  drop-shadow-xl w-full h-full hidden md:block">
                        <table className="w-full md:text-md xl:text-lg text-sm text-left h-max text-gray-500 dark:text-gray-400">
                            <thead className="text-md text-gray-700 uppercase bg-gray-300 dark:bg-gray-800 dark:text-gray-100">
                                <tr >
                                   <th scope="col" className="py-3 px-4 2xl:px-px-6">
                                        Nombre
                                    </th>
                                    <th scope="col" className="py-3 px-10 2xl:px-13">
                                        Modelo
                                    </th>
                                    <th scope="col" className="py-3 md:pr-5">
                                        Cantidad
                                    </th>
                                    <th scope="col" className="py-3 px-5">
                                        Estado
                                    </th>
                                    <th scope="col" className="py-3 px-6 xl:px-16">
                                        Fecha
                                    </th>
                                    <th scope="col" className="py-3 md:px-6 xl:px-11 2xl:px-10">
                                        Autor
                                    </th>
                                    <th scope="col" className="py-3 md:px-6 xl:px-11 2xl:px-4">
                                        Ver detalles
                                    </th>
                                    <th scope="col" className="py-3 md:px-6 xl:px-11 2xl:px-10">
                                        Eliminar
                                    </th>
                                    <th scope="col" className="py-3 md:px-6 xl:px-11 2xl:px-10">
                                        Editar
                                    </th>
                                </tr>
                            </thead>

                                
                            <tbody>
                                {results.map(condicion =>(
                                <tr  key={condicion._id}  className="bg-white border-b dark:bg-gray-700 dark:border-gray-500">
                                    <td className="py-4 md:px-2 2xl:pl-5  text-gray-100">
                                        {condicion.Nombre}
                                    </td>
                            
                                    <td className="py-4 2xl: text-gray-100">
                                        {condicion.modelo}      
                                    </td>
                                    <td className="py-4 md:px-8 2xl:px-5 text-gray-100">
                                        {condicion.cantidad}
                                    </td>
                                    <td className="py-4 md:px-2 2xl:px-0 text-gray-100">
                                        {condicion.estado}
                                    </td>
                                    <td className="py-4 text-gray-100 px-2 2xl:px-0">
                                        {condicion.fecha}
                                    </td>
                                    <td className="py-4 md:px-6 2xl:px-0 text-gray-100">
                                        {condicion.user}
                                    </td>
                                </tr>
                            
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                <div className="container mt-5  flex flex-col items-center -translate-x-16 md:hidden ">
                        {results.map(condition =>(            
                            <>
                                <div   key={condition._id}  className="border-b-2 mx-15 drop-shadow-2xl  shadow-xl border-gray-400">
                                    <div className="p-3  rounded-xl w-46 flex flex-col items-start gap-2 border-black">
                                        <p className="font-bold mb-1 text-lg">Nombre: <span className="font-normal">{condition.Nombre}</span></p>
                                        <p className="font-bold mb-1 text-lg">Modelo: <span className="font-normal">{condition.modelo}</span></p>
                                        <p className="font-bold mb-1 text-lg">Cantidad: <span className="font-normal">{condition.cantidad}</span></p>
                                        <p className="font-bold mb-1 text-lg">Estado: <span className="font-normal">{condition.estado}</span></p>
                                        <p className="font-bold mb-1 text-lg">Fecha: <span className="font-normal">{condition.fecha}</span> </p>
                                        <p className="font-bold mb-1 text-lg">Ingresado por: <span className="font-normal">{condition.user}</span></p>
                                    </div>                                    
                                </div>
                            </>
                        ))}
                </div>

            </>
            
            ) : 
            (
                <>
                    <h2 className="font-black text-2xl text-center">No hay información</h2>
                </> 
            )}
        

        </>
       
       )
    }
    
export default PerforadoraHistory
    
    
