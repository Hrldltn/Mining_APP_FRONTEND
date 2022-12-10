import {useEffect} from 'react'
import useCondicion from '../../hooks/useCondicion'
import Condicion from '../Perforadora/CondicionPerforadora'
const CondicionList = () => {
  const { condicionesHoy } = useCondicion(1)
  return (
    <>  
      {condicionesHoy.length ? (
        <> 
          <h2 className="font-black text-3xl text-center mt-10">Información diaria de Perforadoras</h2>
          <p className="text-xl mt-5 mb-10 text-center">Condiciones e información de las{''} <span className="text-amber-600 font-bold">Perforadoras</span> </p>
          <div className="overflow-y-scroll h-96">
              {condicionesHoy.map(condicion =>(
             
                  <>
                    <Condicion
                    key={condicion._id}
                    condicion={condicion}
                    ></Condicion>

          
                  </>
           
              ))}
          </div>
          
        
        </>
      ) : 
      (
        <>
          <h2 className="font-black text-2xl text-center">No hay información por hoy</h2>
          <p className=" text-xl text-center">Vea Historial para más información</p>
        </> 
      )}
    </>
  )
}

export default CondicionList
