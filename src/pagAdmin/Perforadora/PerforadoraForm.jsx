import {useState,useEffect} from 'react'
import{ Link } from 'react-router-dom'
import Alerta from '../../components/Alerta'
import useCondicion from  '../../hooks/useCondicion'
import useAuth from '../../hooks/useAuth'

const CondicionPer = () => {
  const { auth } = useAuth()
  const [perfil , setPerfil]=useState({})
  const[cantidad,setCantidad]=useState('')
  const[estado,setEstado]=useState('')
  const[modelo,setModelo]=useState('')
  const[Nombre,setNombre]=useState('')
  const[id,setId]=useState(null)
  
  const {nombre , apellido , correo , telefono, area } = perfil
  const[edicion,setEdicion]=useState(false)
 
  const[alerta , setAlerta]=useState({})

  let user = nombre + ' ' + apellido


  const {guardarCondicion,condiciones} = useCondicion()


  useEffect(() => {
    setPerfil(auth)

  },[auth])

  
  useEffect(()=>{
    if(condiciones?.Nombre){
      setNombre(condiciones.Nombre)
      setCantidad(condiciones.cantidad)
      setEstado(condiciones.estado)
      setModelo(condiciones.modelo)
      setId(condiciones._id)
      setEdicion(true)
    }
    
    
  },[condiciones])
  
  
  const handleSubmit= async e =>{
    
    e.preventDefault()
    const Perforadora =[cantidad,Nombre,estado,modelo]
    if(Perforadora.includes('') || 
       Perforadora.includes('Default') || 
       Perforadora.includes('Null')){
      setAlerta({msg:'Los campos no pueden estar vacios', error:true})
      return;
    }
    

    setAlerta({})
    
    guardarCondicion({cantidad,Nombre,estado,modelo,id,user})
    
    setCantidad('')
    setEstado('')
    setModelo('')
    setNombre('')
    setAlerta({msg:'Perforadora Registrada Correctamente', error:false})
    
    if(edicion){
      setAlerta({msg:'Perforadora Editada Correctamente', error:false})
      setTimeout(() => {
        setAlerta({})
        return window.location.href = "Formulario/Condicion";
      },1300)
    }

    setTimeout(() => {
      setAlerta({})
    },1500)

    
  }
  const {msg} = alerta
  return (
    <>
     
      <div className= "md:block  2xl:px-5 xl:mx-72 shadow-2xl bg-gray-100 md:mx-3 md:py-3 rounded-xl md:mt-5 xl:mt-8 md:ml-3">
        <div >
          <h1 className="text-gray-700 font-black text-2xl md:text-4xl text-center pt-10 mb-5 md:mb-12">{id ? 'Edición de Perforadoras': 'Registro de Perforadoras'}</h1>
        </div>
        {msg && <Alerta alerta={alerta}/>}
        <form onSubmit={handleSubmit}>
            <div className="px-4 md:px-20">
                <label className="uppercase text-gray-600 block md:text-xl text-lg font-bold">
                  Nombre:
                </label>
                <input type="text" placeholder="Ingrese el Nombre" className="border w-full p-3 mt-3 md:text-xl text-lg bg-gray-50 rounded-xl" value={Nombre} onChange={e => setNombre(e.target.value)}></input>
            </div>
            <div className="px-4 md:px-20 mt-10">
                <label className="uppercase text-gray-600 block text-lg md:text-xl  font-bold">
                  Modelo:
                </label>
                <select className="border w-full p-3 mt-3 bg-gray-50 rounded-xl md:text-xl text-lg"  value={modelo} onChange={e => setModelo(e.target.value)} aria-label="">
                    <option value='Default'>--Seleccion--</option>
                    <option value="Pit Electrica(PV-351-E)">Pit viper 351 Eléctrica (PV-351-E)</option>
                    <option value="Pit Diesel(PV-351-D)">Pit Viper 351 Diesel (PV-351D) </option>
                    <option value="Smartroc">Smartroc D-65</option>
                    <option value="DML">DML LP </option>
                </select>
            </div>
            <div className="px-4 md:px-20 mt-10">
                <label className="uppercase text-gray-600 block md:text-xl text-lg font-bold">
                  Cantidad:
                </label>
                <input type="Number" placeholder="Ingrese la cantidad" className="md:text-xl text-lg border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={cantidad} onChange={e => setCantidad(e.target.value)}></input>
            </div>
            <div className="px-4 md:px-20 mt-10">
                <label className="uppercase text-gray-600 block md:text-xl  text-lg font-bold">
                  Estado:
                </label>
                <select className="border w-full p-3 mt-3 bg-gray-50 rounded-xl md:text-xl text-lg"  value={estado} onChange={e => setEstado(e.target.value)} aria-label="estado">
                    <option value="Default">--Seleccion--</option>
                    <option value="Buen Estado">Buen Estado</option>
                    <option value="En Mantencion">En Mantencion</option>
                    <option value="Mal Estado">Mal Estado</option>
                </select>
            </div>
        
            <div className="px-4 md:px-20 mt-5 py-5 flex flex-col items-center">
              <input type="submit" value={id ? 'Guardar Cambios': 'Registrar Condiciones'}  className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-600/50  rounded-xl w-full p-2 mt-3 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300"></input>
            </div>
        </form>
      </div>
    </>
  )
}


export default CondicionPer