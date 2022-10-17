import {useEffect} from 'react'
import useCondicion from '../../hooks/useCondicion'
import Condicion from '../../components/CondicionPerforadora'


const CondicionList = () => {
  const { condiciones } = useCondicion()
 
  return (
    <>  
      {condiciones.length ? (
        <> 
          <h2 className="font-black text-3xl text-center mt-10">Información de Perforadora</h2>
          <p className="text-xl mt-5 mb-10 text-center">Condiciones e información de las{''} <span className="text-amber-600 font-bold">Perforadoras</span> </p>
          <div className="overflow-y-scroll h-96">
              {condiciones.map(condicion =>(
                <Condicion
                  key={condicion._id}
                  condicion={condicion}
                ></Condicion>
              ))}
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
