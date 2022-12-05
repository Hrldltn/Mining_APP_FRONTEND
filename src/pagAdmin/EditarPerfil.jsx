import{useEffect,useState} from 'react'
import AdminNav from '../components/AdminNav'
import useAuth from '../hooks/useAuth'
import Alerta from '../components/Alerta'

const EditarPerfil = () => {

  const { auth , editarPerfil} = useAuth()
  const [perfil , setPerfil]=useState({})
  const [validation, setValidation]=useState(true)
  const [alerta , setAlerta]=useState({})

  useEffect(() => {
    setPerfil(auth)

  },[auth])

  const handleSubmit = async e => {

    e.preventDefault()
    const {nombre , apellido , correo , telefono, area } = perfil

    if (telefono == null ){
      setAlerta({msg:'Debes ingresar un Telefono', error:true})
      return;
    }

    setAlerta('')
    const resultado = await editarPerfil(perfil)

    setAlerta(resultado)

  }

  if ( perfil.telefono === 'null'){
    setValidation(false)
  }


  const {msg} = alerta
  return (
    <>
      <AdminNav />
        <div className="2xl:px-5 mt-10 xl:m-10 shadow-2xl bg-gray-300 md:px-2 md:py-5 rounded-xl 2xl:mx-40 md:mt-5 xl:mt-5 md:ml-3 xl:ml-10">
          <h2 className="text-2xl font-black mt-2 mb-5 text-center">¡Modifica tu {''} <span className="text-amber-600 font-bold">Telefono Aquí!</span> </h2>
          {msg && <Alerta alerta={alerta}/>}
          <form onSubmit={handleSubmit} >
              <div className="px-4 md:px-20">
                  <label className="uppercase text-gray-600 block md:text-xl font-bold">
                    Nombre:
                  </label>
                  <input type="text"  disabled placeholder="" className="border w-full p-3 mt-3 bg-gray-200 rounded-xl" name="nombre" value={perfil.nombre || ''}></input>
              </div>
              <div className="px-4 md:px-20 mt-10">
                  <label className="uppercase text-gray-600 block md:text-xl font-bold">
                    Apellido:
                  </label>
                  <input type="text" disabled placeholder="" className="border w-full p-3 mt-3 bg-gray-200 rounded-xl" name="apellido"  value={perfil.apellido || ''}></input>
              </div>
              <div className="px-4 md:px-20 mt-10">
                  <label className="uppercase text-gray-600 block md:text-xl font-bold">
                    Correo:
                  </label>
                  <input type="email" disabled placeholder="" className="border w-full p-3 mt-3 bg-gray-200 rounded-xl" name="correo"  value={perfil.correo || ''}></input>
              </div>
              <div className="px-4 md:px-20 mt-10">
                  <label className="uppercase text-gray-600 block md:text-xl font-bold">
                    Telefono:
                  </label>
                  <input type="tel" placeholder={validation ? 'Ingresa tu telefono' : ''} className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" name="telefono"  value={perfil.telefono || undefined || ''} onChange={e => setPerfil({...perfil,[e.target.name] : e.target.value})}></input>
              </div>
              <div className="px-4 md:px-20 mt-10">
                  <label className="uppercase text-gray-600 block md:text-xl font-bold">
                    Área:
                  </label>
                  <input type="text" disabled  placeholder="" className="border w-full p-3 mt-3 bg-gray-200 rounded-xl mb-10" name="area" value={perfil.area || ''}></input>
              </div>
              <div className="px-4 md:px-20 mt-5 py-5 flex flex-col items-center ">
                <input type="submit" value='Guardar Cambios'  className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-600/50  rounded-xl w-full p-2 mt-3 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-amber-400 hover:text-gray-300 duration-300"></input>
              </div>
          </form>
      </div>
    
    </>
  )
}

export default EditarPerfil
