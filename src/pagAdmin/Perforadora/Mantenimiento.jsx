import React from 'react'
import useCondicion from '../../hooks/useCondicion'
const Mantenimiento = () => {
 
 const {mantenciones} = useCondicion(3)
 print(mantenciones)
  return (
    <div>
      
    </div>
  )
}

export default Mantenimiento
