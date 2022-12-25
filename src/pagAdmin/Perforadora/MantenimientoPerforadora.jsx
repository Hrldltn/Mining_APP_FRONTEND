import {useEffect} from 'react'
import useCondicion from '../../hooks/useCondicion'
import Mantenimiento from '../Perforadora/Mantenimiento'
const CondicionList = () => {
  const { mantenciones } = useCondicion(3)
  return (
    <>  
      {mantenciones.length ? (
        <> 
          <h2 className="font-black text-3xl text-center mt-10">Información diaria de Perforadoras</h2>
          <p className="text-xl mt-5 mb-10 text-center">Condiciones e información de las{''} <span className="text-amber-600 font-bold">Perforadoras</span> </p>
          <div className="overflow-y-scroll h-96">
             
              {mantenciones.map((dato, indice) =>
                {
                  return <Mantenimiento key={indice} condicion={dato}/>
                })}
          </div>
          
        
        </>
      ) : 
      (
        <>
          <h2 className="font-black text-2xl text-center">No hay información</h2>
        </> 
      )}
    </>
  )
}

export default CondicionList