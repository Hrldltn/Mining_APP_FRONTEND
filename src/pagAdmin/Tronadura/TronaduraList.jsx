import {useEffect} from 'react'
import useCondicion from '../../hooks/useCondicion'
import Tronadura from '../Tronadura/Tronadura'

const CondicionList = () => {
  const { tronaduras } = useCondicion(2)
  return (
    <>  
      {tronaduras.length ? (
        <> 
          <h2 className="font-black text-3xl text-center mt-10">Información de Tronaduras</h2>
          <p className="text-xl mt-5 mb-10 text-center">Condiciones e información de las{''} <span className="text-amber-600 font-bold">Tronaduras</span> </p>
          <div className=" min-h-96">
             
              {tronaduras.map((dato, indice) =>
                {
                  return <Tronadura key={indice} tronaduras={dato}/>
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