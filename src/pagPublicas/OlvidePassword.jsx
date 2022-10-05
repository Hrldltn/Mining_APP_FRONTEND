import { useState , useEffect } from 'react'
import ImagenRegistro from '../assets/img/Recuperar.jpg'
import{ Link }from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const OlvidePassword = () => {

  const [correo,setCorreo] = useState('')
  const [alerta , setAlerta] = useState({})


  var sectionStyle={
    width: '100%',
    backgroundImage:`url(${ImagenRegistro})`,
    alt:"Olvide-password"
  }

  const handleSubmit = async e => {

    e.preventDefault()

    if([correo].includes('')){
      setAlerta({msg:'¡ El campo correo no debe estar vacio !',error:true})
      return;
    }

    if(correo.split('@')[1] !== "rtCodelco.cl"){
      setAlerta({msg:'¡ Correo no valido porfavor ingrese el correo de la empresa !',error:true})
      return;
    }
    try {
        const { data } = await clienteAxios.post('usuario/recuperar-password',{correo})
        setAlerta({msg:data.msg})
        setCorreo('')
    } catch (error) {
      setAlerta({msg:error.response.data.msg,error:true})
    }

    setTimeout(() => {
      setAlerta({})
    }, 3000);
  }

  

  const {msg } = alerta

  return (
    <>
      <div className="bg-bottom bg-no-repeat bg-cover row-span-3 h-80 md:h-screen" style={sectionStyle}>
          <h1 className="text-center font-bold text-white text-2xl md:text-4xl pt-36 md:pt-96 md:mr-16">GLOBAL{" "}<span className="text-orange-500 drop-shadow-lg">COPPER</span> MINING</h1> 
      </div>
      <div className="2xl:px-5 xl:m-10 shadow-2xl bg-white md:px-2 md:py-5 rounded-xl md:mt-6 xl:mt-16 md:ml-5 xl:mr-40">
          <div >
            <h1 className="text-amber-500 font-black text-3xl md:text-4xl text-center pt-10 mb-6">¡Reestablece tu Contraseña!</h1>
          </div>

          { msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit}>
              <div className="px-4 md:px-20  py-10">
                  <label className="uppercase text-gray-600 block md:text-xl font-bold">
                    Correo:
                  </label>
                  <input type="email" placeholder="Ingresa tu correo ej: Jose@rtCodelco.cl" className="border w-full p-3 mt-5 bg-gray-50 rounded-xl" value={correo} onChange={e => setCorreo(e.target.value)}>
                  </input>
              </div>
              <div className="px-4 md:px-20 mt-6">
                <input type="submit" value="Enviar"  className="bg-gradient-to-r from-amber-600 to-amber-700 shadow-lg shadow-amber-600/50  rounded-xl w-full p-2 mt-3 font-bold text-xl md:text-2xl text-white hover:cursor-pointer  hover:shadow-amber-400 hover:text-amber-800 duration-300" ></input>
              </div>
          </form>
          <nav className="mt-10 lg:flex lg:justify-around">
              <Link to="/" className="block text-center  text-gray-600 hover:underline hover:cursor-pointer mt-8 text-sm md:text-lg">¿Ya tienes cuenta? ¡Inicia Sesión!</Link>
              <Link to="/Registrar" className="block text-center pb-6 mt-8 text-gray-600 hover:underline hover:cursor-pointer text-sm md:text-lg ">¿No has registrado tu contraseña aún? ¡Regístrate aquí!</Link>
          </nav>
          <div className="text-center mt-10">Logo</div>
      </div>
    </>
  )
}

export default OlvidePassword
