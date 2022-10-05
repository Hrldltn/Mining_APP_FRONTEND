import React from 'react'
import ReactPlayer from 'react-player'
import Video from '../assets/Video/Campaña_seguridad.mp4'


const bienvenida = () => {
 
  return (
    <section className="flex flex-col container items-center">
        <h1 className="text-center font-bold text-xl md:text-2xl text-amber-700 ">¡Bienvenid@s!</h1>
        <h2 className="text-center font-bold text-xl md:text-2xl my-10 ">Un Consejo de Seguridad </h2>
        <div className="h-52 flex w-72  sm:flex-none sm:w-3/4 -translate-y-20 md:-translate-y-5 mb-0 xl:translate-x-40 2xl:translate-x-44 md:mb-40  2xl:ml-36">
            <ReactPlayer url={Video} playing loop controls/>
        </div>
    </section>
  )
}

export default bienvenida
