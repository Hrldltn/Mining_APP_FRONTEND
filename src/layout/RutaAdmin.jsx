import React from 'react'
import {useState} from 'react'
import {Outlet , Navigate , Link} from 'react-router-dom'

import {HiMenuAlt3} from 'react-icons/hi'
import {GiCog,GiEarthCrack,GiMiningHelmet,GiEarthAmerica,GiMining,GiSpanner,GiNotebook,GiCancel} from 'react-icons/gi'

import Header from '../components/Header'
import Footer from '../components/Footer'
import useAuth from '../hooks/useAuth'

const RutaAdmin = () => {
  const {cerrarSesion} = useAuth()
  const { auth , cargando} = useAuth()
  const [abrir,setAbrir]=useState(false)

  const menus = [ 
    {name:"Perforacion y tronadura",link:'Perforacion',icon: GiEarthCrack},
    {name:"Operaciones mina",link:'Perforacion',icon: GiMiningHelmet},
    {name:"Geologia",link:'Perforacion',icon: GiEarthAmerica},
    {name:"Geotecnia",link:'Perforacion',icon: GiMining,margin:true},
    {name:"Mantenimiento",link:'Perforacion',icon: GiSpanner},
    {name:"GSSO",link:'Perforacion',icon: GiNotebook},
    {name:"Configuración",link:'Perfil',icon: GiCog,margin:true},
  ]
  if(cargando) return 'cargando...'
  
  return (
    <>
      <section className="flex ">
          <div className={`bg-gradient-to-r from-gray-700 to-gray-800 min-h-screen ${abrir ? 'w-70':'w-12'} duration-500 text-gray-100`}>
              <div className="py-12 flex justify-end">
                <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setAbrir(!abrir)}/>
              </div>
              <div className="mt-4 flex flex-col gap-2 relative">
                  {menus?.map((menu,i)=>(
                      <Link 
                        to={menu?.link} 
                        key={i} 
                        className= {` ${ 
                          menu?.margin && "mt-5"
                        } group flex items-center text-ms gap-3 font-medium p-3 hover:bg-gray-900 rounded-xl`}>
                        
                        <div className="mr-3">{React.createElement(menu?.icon,{size:"26"})}</div>
                        <h2 style={{transitionDelay:`${i + 2}00ms`}} className={`whitespace-pre duration-500 ${!abrir && 'opacity-0 translate-x-40 overflow-hidden'}`}>{menu?.name}</h2>
                        <h2 className={`${abrir && "hidden"} absolute left-40 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}>{menu?.name}</h2>
                      </Link>
                    ))}
                    <div className='mt-4 flex flex-row  hover:bg-gray-900 rounded-xl'>
                      <div className="p-3"><GiCancel size={25} className="cursor-pointer group hover:bg-gray-900 rounded-xl" onClick={cerrarSesion}/></div>
                      <div className="p-2"><h2 className={`whitespace-pre ${!abrir && 'opacity-0  overflow-hidden'} cursor-pointer mt-1`} onClick={cerrarSesion} >Cerrar sesión</h2></div>
                    </div>
              </div>
          </div>
          <div className="m-3 text-xl text-gray-900 front-semibold w-full">
              <Header/>
                {auth?._id ? (
                  <main className="container mx-auto mt-10">
                      <Outlet/> 
                  </main>
                ):<Navigate to = "/"/>}
              <Footer/>
          </div>
      </section>
    </>
  )
}

export default RutaAdmin
