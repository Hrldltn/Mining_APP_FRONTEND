import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ImagenReestablece from '../assets/img/ReestablecePass.jpg'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'
import{ Link }from 'react-router-dom'

const NuevoPassword = () => {
  const[contraseña , setContraseña]=useState('')
  const[repetirContraseña , setRepetirContraseña]=useState('')
  const[alerta , setAlerta]=useState({})
  const[tokenValido,setTokenValido]=useState(false)
  const [passwordModificado , setPasswordModificado]=useState(false)

  const params = useParams()
  const { token } = params

  useEffect(()=>{
    const comprobarToken = async () =>{
      try {
        await clienteAxios(`usuario/recuperar-password/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({msg:'¡ Hubo un error con el enlace !',error:true})
      }
    }
    comprobarToken()
  },[])

  const handleSubmit = async e =>{
    e.preventDefault()

    if([contraseña , repetirContraseña].includes('')){
      setAlerta({msg:'¡ Los campos no pueden estar vacios !',error:true})
      return
    }

    if(contraseña.length < 6 ){
      setAlerta({msg:'¡ Contraseñas demasiado corta! agrega minimo 6 caracteres !',error:true})
      return
    }

    if(contraseña !== repetirContraseña){
      setAlerta({msg:'¡ Las Contraseñas deben ser iguales !',error:true})
      return
    }
    try {
      const url=`/usuario/recuperar-password/${token}`
      const {data} = await clienteAxios.post(url,{contraseña})
      setAlerta({msg:data.msg})
      setPasswordModificado(true)
      setContraseña('')
      setRepetirContraseña('')
    } catch (error) {
      setAlerta({msg:'',error:true})
    }

    setTimeout(() => {
      setAlerta({})
    }, 3000);
  }

  var sectionStyle={
    width: '100%',
    backgroundImage:`url(${ImagenReestablece})`,
    alt:"Login"
  }

  const { msg } = alerta
  return (
    <>
      <div className="bg-bottom bg-no-repeat bg-cover row-span-3 h-80 md:h-screen" style={sectionStyle}>
          <h1 className="text-center font-bold text-white text-2xl md:text-4xl pt-36 md:pt-96 md:mr-16">GLOBAL{" "}<span className="text-orange-500 drop-shadow-lg">COPPER</span> MINING</h1> 
      </div>
      <div className="2xl:px-5 xl:m-10 shadow-2xl bg-white md:px-2 md:py-5 rounded-xl md:mt-6 xl:mt-16 md:ml-5 xl:mr-40">
          <div >
            <h1 className="text-amber-500 font-black text-3xl md:text-4xl text-center pt-10 mb-6">¡Reestablece tu Contraseña!</h1>
          </div>
          {msg && <Alerta alerta = { alerta }/>}
          {tokenValido && (
              <>
                <form onSubmit={handleSubmit}>
                      <div className="px-4 md:px-20 mt-10">
                          <label className="uppercase text-gray-600 block md:text-xl font-bold">
                            Contraseña:
                          </label>
                          <input type="password" autoComplete="new-password" placeholder="Registra tu Contraseña" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={contraseña} onChange={e => setContraseña(e.target.value)} ></input> 
                      </div>
                      <div className="px-4 md:px-20 mt-10">
                          <label className="uppercase text-gray-600 block md:text-xl font-bold">
                            Repite tu contraseña:
                          </label>
                          <input type="password" autoComplete="new-password" placeholder="Repite tu contraseña" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={repetirContraseña} onChange={e => setRepetirContraseña(e.target.value)}></input>
                      </div>
                      <div className="px-4 md:px-20 mt-10">
                          <input type="submit" value="Guardar nueva Contraseña"  className="bg-gradient-to-r from-amber-600 to-amber-700 shadow-lg shadow-amber-600/50  rounded-xl w-full p-2 mt-3 font-bold text-xl md:text-2xl text-white hover:cursor-pointer  hover:shadow-amber-400 hover:text-amber-800 duration-300" ></input>
                      </div>
                </form>
                
              </>
            )}
            {passwordModificado 
            && <nav className="mt-10 lg:flex lg:justify-around"><Link to="/" className="block text-center  text-gray-600 hover:underline hover:cursor-pointer mt-8 text-sm md:text-lg">¡Inicia Sesión!</Link></nav> 
            }
            <div className="text-center mt-10">Logo</div>
        </div>
          
     </>
  )
}

export default NuevoPassword

// 
// 
