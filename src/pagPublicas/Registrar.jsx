import {useState,useEffect} from 'react'
import{ Link }from 'react-router-dom'
import ImagenRegistro from '../assets/img/Registro.jpg'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const Registrar = () => {
  const[correo,setCorreo]=useState('')
  const[contraseña,setcontraseña]=useState('')
  const[repetirContraseña,setRepetirContraseña]=useState('')
  const[area,setArea]=useState('')
  const[alerta , setAlerta]=useState({})
  
  
  const handleSubmit= async e =>{
    
    
    e.preventDefault()
    
    if([correo,contraseña,repetirContraseña,area].includes('')){
      setAlerta({msg:'¡Los campos no pueden estar vacios!', error:true})
      return;
    }
    
    if(contraseña !== repetirContraseña){
      setAlerta({msg:'¡ Las Contraseñas deben ser iguales !' , error:true})
      return;
    }

    if(contraseña.length < 6){
      setAlerta({msg:'¡ Contraseñas demasiado corta! agrega minimo 6 caracteres !',error:true})
      return;
    }
    
    if(correo.split('@')[1] !== "rtCodelco.cl"){
      setAlerta({msg:'¡ Correo no valido porfavor ingrese el correo de la empresa !',error:true})
      return;
    }
    
    let user=correo.split('@')[0]
    let nombre = user.split('.')[0]
    let apellido = user.split('.')[1]
    console.log(nombre)
    console.log(apellido)
    if(nombre === undefined || apellido === undefined){
      setAlerta({msg:'¡El correo debe contener un nombre y un apellido separados por un "." !', error:true})
      return;
    }

    //crear usuario en rest api backend

    try{
      await clienteAxios.post('usuario',{correo,contraseña,area,nombre,apellido})
      setAlerta({ msg:'¡ Creado correctamente, te hemos enviado un correo !', error:false})
      setCorreo('')
      setcontraseña('')
      setRepetirContraseña('')
      setArea('')
      
    }catch(error){
      setAlerta({ msg: error.response.data.msg, error:true })
    }
    setTimeout(() => {
      setAlerta({})
    }, 3000);
  }

  var sectionStyle={
    width: '100%',
    backgroundImage:`url(${ImagenRegistro})`,
    alt:"Registrar"
  }

  const {msg} = alerta

  return (
    <>
        <div className="bg-bottom bg-no-repeat bg-cover row-span-3 h-80 md:h-screen" style={sectionStyle}>
          <h1 className="text-center font-bold text-white text-2xl md:text-4xl pt-36 md:pt-96 md:mr-16">GLOBAL{" "}<span className="text-orange-500">COPPER</span> MINING</h1> 
        </div>
        <div className="2xl:px-5 xl:m-10 shadow-2xl bg-white md:px-2 md:py-5 rounded-xl md:mt-5 xl:mt-10 md:ml-3 xl:ml-10">
          <div >
            <h1 className="text-amber-500 font-black text-3xl md:text-4xl text-center pt-10 mb-6">¡Registra tu Contraseña!</h1>
          </div>
          {msg && <Alerta alerta={alerta}/>}

          <form onSubmit={handleSubmit}>
                <div className="px-4 md:px-20">
                    <label className="uppercase text-gray-600 block md:text-xl font-bold">
                      Correo:
                    </label>
                    <input type="email" autoComplete="username" placeholder="Registra tu correo ej: Jose@rtCodelco.cl" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={correo} onChange={e => setCorreo(e.target.value)}></input>
                </div>
                <div className="px-4 md:px-20 mt-10">
                    <label className="uppercase text-gray-600 block md:text-xl font-bold">
                      Área:
                    </label>
                    <select className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={area} onChange={e => setArea(e.target.value)} aria-label="">
                        <option value="DEFAULT" >--Seleccion--</option>
                        <option value="Perforacion y Tronadura">Perforacion y Tronadura</option>
                        <option value="Operaciones Mina">Operaciones Mina</option>
                        <option value="Geologia">Geologia</option>
                        <option value="Geotecnia">Geotecnia</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                        <option value="GSSO">GSSO</option>
                    </select>
                </div>
                <div className="px-4 md:px-20 mt-10">
                    <label className="uppercase text-gray-600 block md:text-xl font-bold">
                      Contraseña:
                    </label>
                    <input type="password" autoComplete="new-password" placeholder="Registra tu Contraseña" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={contraseña} onChange={e => setcontraseña(e.target.value)}></input>
                </div>
                <div className="px-4 md:px-20 mt-10">
                    <label className="uppercase text-gray-600 block md:text-xl font-bold">
                      Repite tu contraseña:
                    </label>
                    <input type="password" autoComplete="new-password" placeholder="Repite tu contraseña" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={repetirContraseña} onChange={e => setRepetirContraseña(e.target.value)}></input>
                </div>
                <div className="px-4 md:px-20 mt-10">
                    <input type="submit" value="Registrar"  className="bg-gradient-to-r from-amber-600 to-amber-700 shadow-lg shadow-amber-600/50  rounded-xl w-full p-2 mt-3 font-bold text-xl md:text-2xl text-white hover:cursor-pointer  hover:shadow-amber-400 hover:text-amber-800 duration-300"></input>
                </div>
            </form>
            <nav className="mt-10 lg:flex lg:justify-around">
              <Link to="/" className="block text-center  text-gray-600 hover:underline hover:cursor-pointer text-sm md:text-lg">¿Ya tienes cuenta? ¡Inicia Sesión!</Link>
              <Link to="/recuperar-password" className="block text-center pb-6 text-gray-600 hover:underline hover:cursor-pointer text-sm md:text-lg ">¡Reestablece tu Contraseña!</Link>
            </nav>
            <div className="text-center">Logo</div>
        </div>
    
    </>
  )
}

export default Registrar
