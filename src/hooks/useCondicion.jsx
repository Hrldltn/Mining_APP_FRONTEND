import {useContext} from 'react'
import CondicionContext from '../context/CondicionesProvider'
import TronaduraContext from '../context/TronaduraProvider'

const useCondicion = () => {
  return useContext(CondicionContext)
}
const useTronadura = () => {
  return useContext(TronaduraContext)
}

export {useTronadura, useCondicion }