import {useContext} from 'react'
import CondicionContext from '../context/CondicionesProvider'
import TronaduraContext from '../context/TronaduraProvider'


const useCondicion = (val) => {

  if(val == 1)
  {
    return useContext(CondicionContext)
  }
  if(val == 2)
  {
    return useContext(TronaduraContext)
  }
  
}

export default useCondicion