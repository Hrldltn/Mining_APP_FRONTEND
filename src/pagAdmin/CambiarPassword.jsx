import {useState,useEffect} from 'react'
import AdminNav from '../components/AdminNav'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'

const CambiarPassword =  () => {

  const[alerta , setAlerta]=useState({})
  const [current_password, setCurrent_Password]=useState('')
  const [new_password, setNew_Password]=useState('')
  
  const {guardarPassword} = useAuth()

  const handleSubmit = async e => {

    e.preventDefault();

    if([current_password,new_password].includes('')){
      setAlerta({msg:'Debes colocar una Contraseña', error:true})
      return
    }
 
  
    if(new_password.length<6){
      setAlerta({msg:'La Nueva Contraseña no debe tener menos de 6 caracteres', error:true})
      return
    }
    const respuesta = await guardarPassword({current_password,new_password})
    setAlerta(respuesta)

    setTimeout(() => {
      setAlerta('')
    }, 3000);

  }
  
  const {msg} = alerta

  return (
    <>
      <AdminNav/>
      <div className="2xl:px-5  xl:m-10 shadow-2xl bg-gray-300 md:px-2 md:py-5 rounded-xl 2xl:mx-40 md:mt-5 xl:mt-5 md:ml-3 xl:ml-10">
        <h2 className="text-2xl font-black mt-2 mb-5 text-center">¡Modifica tu {''} <span className="text-amber-600 font-bold">Password Aquí!</span> </h2>
        {msg && <Alerta alerta={alerta}/>}
          <form onSubmit={handleSubmit}>
                <div className="px-4 md:px-20 mt-7">
                    <input type="text" autoComplete="username" className="hidden"/>
                    <label className="uppercase text-gray-600 block md:text-xl font-bold">
                      Contraseña:
                    </label>
                    <input type="password"  autoComplete="current-password" placeholder="Ingresa tu Contraseña Actual" name="current_password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" onChange={e => setCurrent_Password(e.target.value)}></input>
                </div>
                <div className="px-4 md:px-20 mt-7">
                    <label className="uppercase text-gray-600 block md:text-xl font-bold">
                      Nueva contraseña:
                    </label>
                    <input type="password" autoComplete="new-password" placeholder="Registra tu nueva contraseña" name="new_password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" onChange={e => setNew_Password(e.target.value)}></input>
                </div>
                <div className="px-4 md:px-20 mt-5 py-5 flex flex-col items-center ">
                  <input type="submit" value='Guardar Cambios'  className="bg-gradient-to-r from-amber-600 to-amber-700 shadow-lg shadow-amber-600/50  rounded-xl w-full p-2 mt-3 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-amber-400 hover:text-gray-300 duration-300"></input>
                </div>
            </form>
        </div>
    </>
  )
}

export default CambiarPassword
