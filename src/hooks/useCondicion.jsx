import {useContext} from 'react'
import CondicionContext from '../context/CondicionesProvider'
import TronaduraContext from '../context/TronaduraProvider'
import MantencionContext from '../context/MantencionProvider'

const useCondicion = (val) => {

  if(val == 1)
  {
    return useContext(CondicionContext)
  }
  if(val == 2)
  {
    return useContext(TronaduraContext)
  }
  if(val == 3)
  {
    return useContext(MantencionContext)
  }
  
}

export default useCondicion