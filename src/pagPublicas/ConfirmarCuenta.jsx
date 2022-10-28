import {useState,useEffect} from 'react'
import ImagenConfirmar from '../assets/img/Confirmar.jpg'
import {Link , useParams} from 'react-router-dom'
import clienteAxios from '../config/axios'
import Alerta from '../components/Alerta'
import Footer from '../components/Footer'
const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada]=useState(false)
  const [cargando, setCargando]=useState(true)
  const [alerta , setAlerta]=useState({})
  
  const params = useParams()
  const { token } = params

  useEffect(() =>{
      const confirmarCuenta=async () =>{
          try{
            const url = `usuario/confirmar/${token}`
            const { data } = await clienteAxios(url)
            setCuentaConfirmada(true)
            setAlerta({msg:data.msg,error:false})
          }catch(error){
            setAlerta({msg:error.response.data.msg,error:true})
          }

          setCargando(false)
          
      }
      confirmarCuenta()
  },[])


  var sectionStyle={
    width: '100%',
    backgroundImage:`url(${ImagenConfirmar})`,
    alt:"Registrar"
  }
  const {msg} = alerta
  return (
    <>
      <div className="bg-left bg-no-repeat bg-cover row-span-3 h-80 md:h-screen" style={sectionStyle}>
          <h1 className="text-center font-bold text-white text-2xl md:text-4xl pt-36 md:pt-36 md:mr-16">GLOBAL{" "}<span className="text-orange-500">COPPER</span> MINING</h1> 
      </div>
      <div className="2xl:px-5 xl:m-10 shadow-2xl bg-white md:px-2 md:py-5 rounded-xl md:mt-10 xl:mt-20 xl:mx-10">
          {!cargando && <Alerta alerta={alerta}/>}
          {cuentaConfirmada &&<Link to="/" className="block text-center  text-gray-600 hover:underline hover:cursor-pointer text-sm md:text-lg">¡Inicia Sesión!</Link>}

      </div>
    </>
  )
}

export default ConfirmarCuenta