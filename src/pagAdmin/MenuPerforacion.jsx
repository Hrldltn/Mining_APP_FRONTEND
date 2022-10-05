import {Link } from 'react-router-dom'
import Condicion from '../assets/img/Condicion.jpg'
import Tronadura from '../assets/img/TronaPro.jpg'
import Traslado from '../assets/img/Traslado.jpg'
import Sondaje from '../assets/img/sondaje.jpg'

const AdminPerforacion = () => {
  const CondicionIMG={
    width: '100%',
    backgroundImage:`url(${Condicion})`,
    alt:"Login"
  }
  const TronaduraIMG  ={
    width: '100%',
    backgroundImage:`url(${Tronadura})`,
    alt:"Login"
  }
  const TrasladoIMG  ={
    width: '100%',
    backgroundImage:`url(${Traslado})`,
    alt:"Login"
  }
  const SondajeIMG  ={
    width: '100%',
    backgroundImage:`url(${Sondaje})`,
    alt:"Login"
  }
  return (
    <section>
      <div className="container">
          <nav className="flex flex-col items-center 2xl:flex-row align-center">
            <Link to="PerforadoraForm">
              <div className="h-96 w-72 md:w-96 p-1 my-4 md:p-0 md:ml-0 cursor-pointer mr-5 transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl">
                <div className="bg-right bg-no-repeat bg-cover w-full h-full rounded-3xl" style={CondicionIMG}>
                  <div className=" w-50 h-full md:w-96 md:h-96 bg-gray-900 bg-opacity-60 rounded-3xl">
                    <h1 className="text-amber-500 text-center pt-10">Condicion de la Perforadora</h1>
                    <p className="text-white p-7">Área de condicion de la perforadora esta seccion encontraras informacion de la maquinaria 
                      y de su condición.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <div className="h-96 w-72 md:w-96 p-1 my-4 md:p-0 md:ml-0 cursor-pointer  mr-5 transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl">
              <div className=" bg-center bg-no-repeat bg-cover w-full h-full rounded-3xl" style={TronaduraIMG}>
                <div className="w-50 h-full md:w-96 md:h-96 bg-gray-900 bg-opacity-60 rounded-3xl">
                  <h1 className="text-amber-500 text-center pt-10">Tronadura Programada</h1>
                  <p className="text-white p-7">Área donde se desarrollaran las Tronaduras en esta seccion encontraras informacion
                  de los horarios de las tronaduras. 
                  </p>
                </div>
              </div>
            </div>
            <div className="h-96 w-72 md:w-96 p-1 my-4 md:p-0 md:ml-0 cursor-pointer  mr-5 transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl">
              <div className=" bg-right bg-no-repeat bg-cover w-full h-full rounded-3xl" style={TrasladoIMG}>
                <div className="w-50 h-full md:w-96 md:h-96 bg-gray-900 bg-opacity-60 rounded-3xl">
                  <h1 className="text-amber-500 text-center pt-10">Traslado de Perforadora</h1>
                  <p className="text-white p-7">Área donde se desarrollaran los Traslado de la maquinaria áqui encontraras informacion
                    y de los horarios de los traslados. 
                  </p>
                </div>
              </div>
            </div>
            <div className="h-96 w-72 md:w-96 p-1 my-4 md:p-0 md:ml-0 cursor-pointer  mr-5 transition duration-300 ease-in-out hover:scale-105 hover:drop-shadow-2xl">
              <div className=" bg-left bg-no-repeat bg-cover w-full h-full rounded-3xl" style={SondajeIMG}>
                <div className="w-50 h-full md:w-96 md:h-96 bg-gray-900 bg-opacity-60 rounded-3xl">
                  <h1 className="text-amber-500 text-center pt-10">Metros de Sondajes</h1>
                  <p className="text-white p-7">Área donde se desarrollaran los metros de sondaje para las tronaduras en esta seccion encontraras informacion 
                    de los horarios y los metros de sondajes. 
                  </p>
                </div>
              </div>
            </div>
        </nav>
      </div>
      
    </section>
  )
}

export default AdminPerforacion
