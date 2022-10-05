import {useEffect} from 'react'
import useCondicion from '../../hooks/useCondicion'
import Condicion from '../../components/Condicion'

const CondicionList = () => {
  const { condicion } = useCondicion()
  console.log(condicion)
  return (
    <>  
      {condicion.length ? (
        <> 
          <h2 className="font-black text-2xl text-center">Información de Perforadora</h2>
          {condicion.map(condicion =>(
            <Condicion
              key={condicion._id}
              condicion={condicion}
            ></Condicion>
          ))}
        
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
