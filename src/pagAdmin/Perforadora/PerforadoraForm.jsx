import {useState,useEffect} from 'react'
import{ Link } from 'react-router-dom'
import Alerta from '../../components/Alerta'
import useCondicion from  '../../hooks/useCondicion'
import useAuth from '../../hooks/useAuth'

const CondicionPer = () => {
  const { auth } = useAuth()
  const[perfil , setPerfil]=useState({})
  const[cantidad,setCantidad]=useState('')
  const[estado,setEstado]=useState('')
  const[modelo,setModelo]=useState('')
  const[Nombre,setNombre]=useState('')
  const[observacion,setObservacion]=useState('')
  const[detallesMantencion,setDetallesMantencion]=useState([])
  const[detallesMalEstado,setdetallesMalEstado]=useState([])
  const[imagen,setImagen]=useState('')
  const[file,setFile]=useState('')
  const[id,setId]=useState(null)
  const[mostrar,setMostrar]=useState(false)
  const[Mantencion,setMantencion]=useState(false)


  
  const {nombre , apellido , correo , telefono, area } = perfil
  const[edicion,setEdicion]=useState(false)
 
  const[alerta , setAlerta]=useState({})

  let user = nombre + ' ' + apellido


  const {guardarCondicion,condiciones} = useCondicion(1)


  useEffect(() => {
    setPerfil(auth)
  },[auth])

  
  useEffect(()=>{
    if(condiciones?.Nombre){
      setObservacion(condiciones.observacion)
      setNombre(condiciones.Nombre)
      setCantidad(condiciones.cantidad)
      setEstado(condiciones.estado)
      setModelo(condiciones.modelo)
      setId(condiciones._id)
      setEdicion(true)
      if(condiciones.detallesMantencion.length > 0){
        setMostrar(false)
        setMantencion(true)
        setDetallesMantencion([])

      }
      
      if(condiciones.detallesMalEstado.length > 0){
        setMantencion(false)
        setMostrar(true)
        setDetallesMantencion(condiciones.detallesMantencion)
        setdetallesMalEstado([])
      }
      
    }
    
    
  },[condiciones])

  const handleEstado = (e) =>{
    /* Para obtener el numero iterado */
    var combo = e.target.selectedIndex
    if(combo === 0 || combo === 1){
      setMostrar(false)
      setMantencion(false)
      return
    }
    if(combo === 2){
      setMantencion(true)
      setMostrar(false)
      return
    }
    if(combo === 3){
      setMostrar(true)
      setMantencion(false)
      return
    }
  }

  const handleFileChange = (e) =>{
    const [file] = e.target.files
    
    const size50mb =50 * 1024 * 1024
    const isValidSize = file.size < size50mb
    const isNameOfOneImageRegEx = /.(jpe?g|gif|png)$/i;
    const isValidType=isNameOfOneImageRegEx.test(file.name)
    
    if(!isValidSize){
      setAlerta({msg:'La Imagen es demasiado grande,máximo 50MB', error:true})
      return;
    }
    if(!isValidType){
      setAlerta({msg:'Sólo debes subir imágenes', error:true})
      return;
    }


    const reader = new FileReader(file)
    reader.onloadend=()=>{
      setFile(reader.result)
    }
    reader.readAsDataURL(file)

    
    setImagen(file.name)
  }

  const handleMantencion = (e) =>{
    detallesMantencion.push(e.target.value)
    setDetallesMantencion(detallesMantencion)
  }

  const handleMalEstado= (e) =>{
    detallesMalEstado.push(e.target.value)
    setdetallesMalEstado(detallesMalEstado)
  }
  
  const handleSubmit= async e =>{
    e.preventDefault()

    
    // if(!imagen){
    //   setAlerta({msg:'Debes ingresar una imagen', error:true})
    //   return;
    // }
    
    const Perforadora =[cantidad,Nombre,estado,modelo]
    if(Perforadora.includes('') || 
    Perforadora.includes('Default') || 
    Perforadora.includes('Null')){
      setAlerta({msg:'Los campos no pueden estar vacios', error:true})
      return;
    }
    
    if(!handleMantencion || !handleMalEstado){
      if(detallesMantencion[0] == undefined || detallesMalEstado[0] == undefined)
      setAlerta({msg:'Debe Agregar Detalles del estado', error:true})
      return;
    }
 

  
    if(estado == 'En Mantencion' || estado =='Mal Estado'){
      if(observacion ==' '){
        setAlerta({msg:'Debe ingresar una Observación sobre el mal estado o la mantención de la perforadora', error:true})
        return;
      }
    }
    
    guardarCondicion({cantidad,Nombre,estado,modelo,id,user,observacion,detallesMantencion,detallesMalEstado,imagen})
    
    setCantidad('')
    setObservacion('')
    setEstado('')
    setModelo('')
    setNombre('')
    setImagen('')
    setdetallesMalEstado([])
    setDetallesMantencion([])
    
    setAlerta({msg:'Perforadora Registrada Correctamente', error:false})
    
    if(edicion){
      setAlerta({msg:'Perforadora Editada Correctamente', error:false})
      setTimeout(() => {
        setAlerta({})
        return window.location.href = "Condicion";
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
        <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
            <div className="px-4 md:px-20 mb-5">
                <label className="uppercase text-gray-600 block md:text-xl text-lg font-bold">
                  Imagen de la Perforadora:
                </label>
                <input type="file" accept=".jpg, .jpeg, .png" className="border w-full p-3 mt-3 md:text-xl text-lg bg-gray-50 rounded-xl" filename="file" onChange={handleFileChange}></input>
                <img className={`img-fluid ${imagen ? 'block' : 'hidden'}`} src={file} alt="img"></img>
            </div>
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
                <select className="border w-full p-3 mt-3 bg-gray-50 rounded-xl md:text-xl text-lg"  value={modelo}  onChange={e => setModelo(e.target.value)} aria-label="">
                    <option value='Default'>--Selección--</option>
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
                <select className="border w-full p-3 mt-3 bg-gray-50 rounded-xl md:text-xl text-lg"  value={estado} onChange={e =>{setEstado(e.target.value); handleEstado(e);}} aria-label="estado">
                    <option value="Default">--Selección--</option>
                    <option value="Buen Estado">Buen Estado</option>
                    <option value="En Mantencion">En Mantención</option>
                    <option value="Mal Estado">Mal Estado</option>
                </select>
            </div>
            <label className={`${Mantencion ? 'block ':'hidden'} uppercase text-gray-600 block md:text-xl text-lg font-bold my-5 px-4 md:px-20 `}>
              Detalles de Mantencion:
            </label>
            <div className={`${Mantencion ? 'block ':'hidden'} px-4 md:px-20 mt-10 min-h-[30rem] flex md:flex-wrap md:flex-row justify-around flex-col flex-nowrap items-center`}>
                <div>
                  <ul className={`${Mantencion ? 'block ':'hidden'} w-49 text-sm md:text-base font-medium text-black bg-white rounded-lg border border-gray-200`}>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <p className="mt-5 mx-1 text-center border-gray-600 bg-gray-200 p-3">Mantención Mecanica</p>
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Rotopercusión" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMantencion(e)}}/>
                              <label  className="py-3 ml-2 w-full text-sm md:text-base font-medium text-gray-900">Rotopercusión</label>
                          </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Rotación" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMantencion(e)}}/>
                              <label className="py-3 ml-2 w-full text-sm  md:text-base font-medium text-gray-900">Rotación</label>
                          </div>
                      </li>
                  </ul>
                
                  <ul className={`${Mantencion ? 'block ':'hidden'} md:mt-10 mt-5 w-52 text-sm md:text-base font-medium text-black bg-white rounded-lg border border-gray-200`}>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <p className="mt-5 mx-1 text-center border-gray-600 bg-gray-200 p-3">Mantención Térmica</p>
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Soplete o lanza térmica" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMantencion(e)}}/>
                              <label  className="py-3 ml-2 pr-[1px] w-full text-sm md:text-base font-medium text-gray-900">Soplete o lanza térmica</label>
                          </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Fluido Caliente" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMantencion(e)}}/>
                              <label className="py-3 ml-2 w-full text-sm md:text-base font-medium text-gray-900">Fluido Caliente</label>
                          </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Congelación" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMantencion(e)}}/>
                              <label className="py-3 ml-2 w-full text-sm md:text-base font-medium text-gray-900">Congelación</label>
                          </div>
                      </li>
                  </ul>
                </div>
                <div>
                  <ul className={`${Mantencion ? 'block ':'hidden'} mt-5 md:mt-0 w-52 text-sm md:text-base font-medium text-black bg-white rounded-lg border border-gray-200`}>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <p className="mt-5 mx-1 text-center md:text-base border-gray-600 bg-gray-200 p-3">Mantención Hidráulicas</p>
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Chorro de agua-Erosión" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMantencion(e)}}/>
                              <label  className="py-3 ml-2 w-full text-sm  md:text-base font-medium text-gray-900">Chorro de agua-Erosión</label>
                          </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Cavitación Sónicos" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMantencion(e)}}/>
                              <label className="py-3 ml-2 w-full text-sm md:text-base font-medium text-gray-900">Cavitación Sónicos</label>
                          </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Vibración de alta frecuencia Químicas" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMantencion(e)}}/>
                              <label className="py-3 ml-2 w-full text-sm md:text-base font-medium text-gray-900">Vibración de alta frecuencia Químicas</label>
                          </div>
                      </li>
                  </ul>
               
                  <ul className={`${Mantencion ? 'block ':'hidden'}mt-5  w-49 text-sm md:text-base font-medium text-black bg-white rounded-lg border border-gray-200`}>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <p className="mt-5 mx-1 text-center border-gray-600 bg-gray-200 p-3">Mantención Eléctricas</p>
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Arco eléctrico" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMantencion(e)}}/>
                              <label  className="py-3 ml-2 w-full text-sm md:text-base font-medium text-gray-900">Arco eléctrico</label>
                          </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Inducción magnética" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMantencion(e)}}/>
                              <label className="py-3 ml-2 w-full text-sm md:text-base font-medium text-gray-900">Inducción magnética</label>
                          </div>
                      </li>
                  </ul>
                </div>
            </div>

            <label className={`${mostrar ? 'block ':'hidden'} uppercase text-gray-600 block md:text-xl text-lg font-bold my-5 px-4 md:px-20`}>
                  Detalles Mal Estado:
            </label>
            <div className={`${mostrar ? 'block ':'hidden'} px-4 md:px-20 mt-10 min-h-[20rem] flex flex-wrap justify-around`}>
              <div>
                <ul className={`${mostrar ? 'block ':'hidden'}  w-48 text-sm md:text-base font-medium text-black bg-white rounded-lg border border-gray-200`}>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <p className="mt-5 mx-1 text-center  border-gray-600 bg-gray-200 p-3">Estado Frontal</p>
                        <div className="flex items-center pl-3">
                            <input type="checkbox" value="Deslizadera Hidráulica de cadena" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMalEstado(e)}}/>
                            <label  className="py-3 ml-2 w-full text-sm md:text-base font-medium text-gray-900">Deslizadera Hidráulica de cadena</label>
                        </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <input type="checkbox" value="Tambor de Tuberías flexibles" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMalEstado(e)}}/>
                            <label className="py-3 ml-2 w-full text-sm  md:text-base  font-medium text-gray-900">Tambor de Tuberías flexibles</label>
                        </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <input type="checkbox" value="Perforadora Hidráulica" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMalEstado(e)}}/>
                            <label className="py-3 ml-2 w-full text-sm  md:text-base font-medium text-gray-900">Perforadora Hidráulica</label>
                        </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center pl-3">
                            <input type="checkbox" value="Brazo Articulado" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMalEstado(e)}}/>
                            <label className="py-3 ml-2 w-full text-sm md:text-base  font-medium text-gray-900">Brazo Articulado</label>
                        </div>
                    </li>
                </ul>
              </div>
              <div>
                  <ul className={`${mostrar ? 'block ':'hidden'}  mt-5  w-48 text-sm  md:text-base font-medium text-black bg-white rounded-lg border border-gray-200`}>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <p className="mt-5 mx-1 text-center border-gray-600 bg-gray-200 p-3">Estado Central</p>
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Guía Hidráulica de las varillas" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMalEstado(e)}}/>
                              <label  className="py-3 ml-2 w-full text-sm  md:text-base font-medium text-gray-900">Guía Hidráulica de las varillas</label>
                          </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Panel de Control" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMalEstado(e)}}/>
                              <label className="py-3 ml-2 w-full text-sm  md:text-base font-medium text-gray-900">Panel de Control</label>
                          </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Brazo Giratorio para el control" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMalEstado(e)}}/>
                              <label className="py-3 ml-2 w-full text-sm  md:text-base font-medium text-gray-900">Brazo Giratorio para el control</label>
                          </div>
                      </li>
                  </ul>
                </div>
              <div>
                  <ul className={`${mostrar ? 'block ':'hidden'}  mt-5  w-48 text-sm md:text-base font-medium text-black bg-white rounded-lg border border-gray-200`}>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <p className="mt-5 mx-1 text-center border-gray-600 bg-gray-200 p-3">Estado Trasero</p>
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Sistema oscilante de las orugas" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMalEstado(e)}}/>
                              <label  className="py-3 ml-2 w-full text-sm md:text-base font-medium text-gray-900">Sistema oscilante de las orugas</label>
                          </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Panel de Control Trasero" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMalEstado(e)}}/>
                              <label className="py-3 ml-2 w-full text-sm md:text-base font-medium text-gray-900">Panel de Control Trasero</label>
                          </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                          <div className="flex items-center pl-3">
                              <input type="checkbox" value="Compresor" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500" onChange={e =>{handleMalEstado(e)}}/>
                              <label className="py-3 ml-2 w-full text-sm md:text-base font-medium text-gray-900">Compresor</label>
                          </div>
                      </li>
                  </ul>
                </div>
            </div>  

            <div className="px-4 md:px-20 mt-10">
                <label className= "uppercase text-gray-600 block md:text-xl text-lg font-bold">
                  Observaciones:
                </label>
                <textarea  placeholder="Ingrese el Motivo del estado de la maquinaria" className=" border w-full  mt-3 md:text-xl p-5 text-lg h-40 bg-gray-50 h-50 rounded-xl" value={observacion} onChange={e => setObservacion(e.target.value)}></textarea>
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