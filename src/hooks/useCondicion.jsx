import {useContext} from 'react'
import CondicionContext from '../context/CondicionesProvider'

const useCondicion = () => {
  return useContext(CondicionContext)
}

export default useCondicion