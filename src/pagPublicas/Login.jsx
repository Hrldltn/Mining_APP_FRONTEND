import {useState } from 'react'
import ImagenLogin from '../assets/img/Login.jpg'
import{ Link , useNavigate} from 'react-router-dom'
import Alerta from '../components/Alerta'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/axios'

const Login = () => {
  const [alerta , setAlerta]=useState({})
  const [correo, setCorreo]=useState('')
  const [contraseña, setContraseña]=useState('')
  const {setAuth} = useAuth()
  const navigate=useNavigate()

  var sectionStyle={
    width: '100%',
    backgroundImage:`url(${ImagenLogin})`,
    alt:"Login"
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if([correo,contraseña].includes('')){
        setAlerta({msg:'¡ Tienes campos vacios !', error:true})
        return;
    }

    if(contraseña.length < 6){
      setAlerta({msg:'¡Contraseñas demasiado corta! agrega minimo 6 caracteres',error:true})
      return;
    }

    // if(correo.split('@')[1] !== "rtCodelco.cl"){
    //   setAlerta({msg:'¡ Correo no valido porfavor ingrese el correo de la empresa !',error:true})
    //   return;
    // }

    try {
      const { data } = await clienteAxios.post('usuario/login',{correo,contraseña})
      localStorage.setItem('Mining_token',data.token)
      setAuth(data)
      navigate('/admin')
    } catch (error) {
      setAlerta({msg:error.response.data.msg,error:true})
    }

    setTimeout(()=>{
      setAlerta({})
    },4000)
    
  }

  const {msg} = alerta

return (
    <>
      <div className="bg-top bg-no-repeat bg-cover row-span-3 h-80 md:h-screen" style={sectionStyle}>
        <h1 className="text-center font-bold text-white text-2xl md:text-5xl pt-6 md:pt-20">GLOBAL{" "}<span className="text-orange-500 ">COPPER</span> MINING</h1> 
        <p className="text-center font-bold text-white text-2xl md:text-4xl md:mt-3">¡BIENVENID@S!</p>
      </div>
      <div className=" md:mt-16 shadow-2xl  md:py-3 rounded-xl bg-white md:mr-6 xl:mr-36 xl:ml-10">
          <h1 className="text-amber-500 font-black text-3xl md:text-4xl text-center pt-5 md:mt-10">Inicio de Sesión</h1>
          { msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
              <div className="px-4 md:px-16 mt-10 md:mt-10">
                <label className="uppercase text-gray-600 block md:text-xl font-bold">
                  Email
                </label>
                <input type="email" autoComplete="username" placeholder="Ingresa tu correo ej: Jose@rtCodelco.cl" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={correo} onChange={e => setCorreo(e.target.value)}
                />
              </div>
              <div className="px-4 md:px-16 mt-10">
                <label className="uppercase text-gray-600 block md:text-xl font-bold">
                  Contraseña
                </label>
                <input type="password" autoComplete="current-password" placeholder="Contraseña de Ingreso" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={contraseña} onChange={e => setContraseña(e.target.value)}
                />
              </div>
              <div className="px-4 md:px-16 mt-10">
                <input type="submit" value="Iniciar Sesión"  className="bg-gradient-to-r from-amber-600 to-amber-700 shadow-lg shadow-amber-600/50  rounded-xl w-full p-2 mt-3 font-bold text-xl md:text-2xl text-white hover:cursor-pointer  hover:shadow-amber-400 hover:text-amber-800 duration-300" ></input>
              </div>
           </form>
           <nav className="mt-10 lg:flex lg:justify-around">
              <Link to="/registrar" className="block text-center my-5 text-gray-600 hover:underline hover:cursor-pointer text-sm md:text-lg">¡Registra tu  Nueva Contraseña!</Link>
              <Link to="/recuperar-password" className="block text-center my-5 text-gray-600 hover:underline hover:cursor-pointer text-sm md:text-lg pb-5">¡Reestablece tu Contraseña!</Link>
           </nav>
           <div className="md:px-20 mb-4 ">
            <p> ; No olvides que para iniciar sesión debes ingresar con tu correo de Área o el indicado por tu jefatura si es un nuevo usuario debe registrar su contraseña de lo contrario recupere la contraseña olvidada.</p>
           </div>
           <div className="text-center">Logo</div>
        </div>
    </>
  )
}

export default Login
