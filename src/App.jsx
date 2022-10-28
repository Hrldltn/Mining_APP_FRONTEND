import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaAdmin'

import Login from './pagPublicas/Login'
import Registrar from './pagPublicas/Registrar'
import ConfirmarCuenta from './pagPublicas/ConfirmarCuenta'
import OlvidePassword from './pagPublicas/OlvidePassword'
import NuevoPassword from './pagPublicas/NuevoPassword'

import Bienvenida from './pagAdmin/Bienvenida'
import CambiarPassword from './pagAdmin/CambiarPassword'
import EditarPerfil from './pagAdmin/EditarPerfil'

import MenuPerforacion from './pagAdmin/MenuPerforacion'
import PerforadoraForm from './pagAdmin/Perforadora/PerforadoraForm'
import CondicionList from './pagAdmin/Perforadora/PerforadoraList'
import PerforadoraHistory from './pagAdmin/Perforadora/PerforadoraHistory'


import {AuthProvider} from './context/AuthProvider'
import {CondicionProvider} from './context/CondicionesProvider'

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <CondicionProvider>
              <Routes>
                  {/* PUBLICAS */}
                  <Route path="/" element={<AuthLayout/>}> 
                      <Route index element={<Login/>} />
                      <Route path="registrar" element={<Registrar/>} />
                      <Route path="recuperar-password" element={<OlvidePassword/>} />
                      <Route path="recuperar-password/:token" element={<NuevoPassword/>} />
                      <Route path="confirmar/:token" element={<ConfirmarCuenta/>} />
                  </Route>

                    {/* PRIVADAS */}
                  <Route path="/admin" element={<RutaProtegida/>}>
                      <Route index element={<Bienvenida/>}/>

                      {/* PERFIL*/}
                      <Route path="Perfil" element={<EditarPerfil/>}/>
                      <Route path="Modificar-Password" element={<CambiarPassword/>}/>

                      {/* PERFORADORA Y TRONADURA */}
                      <Route path="Perforacion" element={<MenuPerforacion/>}/>
                      <Route path="Perforacion/Formulario" element={<PerforadoraForm/>}/>
                      <Route path="Perforacion/Formulario/Condicion" element={<CondicionList/>}/>
                      <Route path="Perforacion/Formulario/Historial" element={<PerforadoraHistory/>}/>

                      {/* TRONADURA */}
                      <Route path="Perforacion" element={<MenuPerforacion/>}/>
                      <Route path="Perforacion/PerforadoraForm" element={<PerforadoraForm/>}/>
                      <Route path="Perforacion/PerforadoraForm/Perforadora" element={<CondicionList/>}/>

                      {/* TRASLADO */}
                      <Route path="Perforacion" element={<MenuPerforacion/>}/>
                      <Route path="Perforacion/PerforadoraForm" element={<PerforadoraForm/>}/>
                      <Route path="Perforacion/PerforadoraForm/Perforadora" element={<CondicionList/>}/>
                      
                      {/* SONDAJE */}
                      <Route path="Perforacion" element={<MenuPerforacion/>}/>
                      <Route path="Perforacion/PerforadoraForm" element={<PerforadoraForm/>}/>
                      <Route path="Perforacion/PerforadoraForm/Perforadora" element={<CondicionList/>}/>
                </Route>
              </Routes>
          </CondicionProvider>
        </AuthProvider>            
      </BrowserRouter>
    )
}

export default App
