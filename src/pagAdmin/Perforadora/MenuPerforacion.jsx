
import {Link } from 'react-router-dom'
import {HiChevronDown,HiPencil ,HiOutlineClipboardList,HiOutlineBookOpen} from 'react-icons/hi'
import Condicion from '../../assets/img/Condicion.jpg'
import Tronadura from '../../assets/img/TronaPro.jpg'
import Traslado from '../../assets/img/Traslado.jpg'
import Sondaje from '../../assets/img/sondaje.jpg'

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
      <div className="flex flex-col items-center  xl:items-start xl:flex-row  2xl:gap-9">

        <div className="flex flex-col 2xl:w-[23rem] md:w-[23.7rem] xl:w-[18rem] xl:mr-2 ">
          <div className=" bg-right bg-no-repeat bg-cover h-[20rem] rounded-t-2xl rounded-b-sm" style={CondicionIMG}>
            <div className=" w-[16rem] h-full md:w-full   bg-gray-900 bg-opacity-70 rounded-t-2xl">
              <p className="text-white p-3 pt-20 text-sm md:text-lg">Área de condiciones de perforadora en esta sección encontrarás información de la maquinaria  y de su condición.</p>
            </div>
          </div>
          <div className="container md:mr-5 mb-5 relative  w-[256px] md:w-[380px] xl:w-[400px] overflow-hidden ">
            <input type="checkbox"  className="absolute top-0 inset-x-0 w-full  h-12 opacity-0 z-10 cursor-pointer peer"></input>
            <div className="bg-gray-700 h-12 md:w-full w-full xl:w-[18rem] 2xl:w-[23rem] pl-3  flex items-center border-xl rounded-t-l-lg 2xl:py-7">
              <h1 className="text-sm font-semibold pr-2 xl:text-lg  text-gray-200">Condicion Perforadora</h1>
            </div>
            <div className="absolute top-3 right-3 text-white xl:-translate-x-32 2xl:-translate-x-7 transition-transform duration-500 ml-4 rotate-0 peer-checked:rotate-180">
              <HiChevronDown size="30"></HiChevronDown>
            </div>
            <div className="bg-white overflow-hidden xl:w-[18rem] 2xl:w-[23rem] transition-all duration-500 rounded-b-lg max-h-0 peer-checked:max-h-96">
              <div className="py-3 list-none">
                <Link to="Formulario"><li className=" py-4 hover:underline underline-offset-4 hover:bg-gray-200 px-3 rounded-md text-sm xl:text-lg pb-2"><HiPencil className="float-right mx-1"></HiPencil>Registrar Perforadora</li></Link>
                <Link to="Formulario/Condicion"><li className="py-4 hover:underline underline-offset-4 px-3  hover:bg-gray-200 rounded-md text-sm  xl:text-lg pb-2"><HiOutlineClipboardList className="float-right mx-1 mt-1"></HiOutlineClipboardList>Condicion de Perforadora</li></Link>
                <Link to="Formulario/Historial"><li className="py-4 hover:underline underline-offset-4 px-3  hover:bg-gray-200 rounded-md text-sm pb-2  xl:text-lg "><HiOutlineBookOpen className="float-right mx-1 mt-1"></HiOutlineBookOpen>Historial de Condiciones</li></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col 2xl:w-[23rem] md:w-[23.7rem] xl:w-[18rem] xl:mr-2">
          <div className="bg-right bg-no-repeat bg-cover h-[20rem] rounded-t-2xl  rounded-b-sm" style={TronaduraIMG}>
            <div className=" w-[16rem] h-full md:w-full  bg-gray-700 bg-opacity-60 rounded-t-2xl">
              <p className="text-white p-2 pt-20 text-sm md:text-lg">Área donde se desarrollaran las Tronaduras en esta sección encontraras información
                  de los horarios de tronaduras. 
              </p>
            </div>
          </div>
          <div className="container md:mr-5 mb-5 relative  w-[256px] md:w-[380px] xl:w-[400px] overflow-hidden ">
            <input type="checkbox"  className="absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer peer"></input>
            <div className="bg-gray-700 h-12 w-full  xl:w-[18rem] 2xl:w-[23rem] pl-3  flex items-center border-xl rounded-t-l-lg 2xl:py-7">
              <h1 className="text-sm font-semibold pr-2 xl:text-lg  text-gray-200">Tronadura Programada</h1>
            </div>
            <div className="absolute top-3 right-3 text-white xl:-translate-x-32 2xl:-translate-x-7 transition-transform duration-500 ml-4 rotate-0 peer-checked:rotate-180">
              <HiChevronDown size="30"></HiChevronDown>
            </div>
            <div className="bg-white overflow-hidden  xl:w-[18rem] 2xl:w-[23rem] transition-all duration-500 rounded-b-lg max-h-0 peer-checked:max-h-96">
              <div className="py-3 list-none">
                <Link to="Formulario"><li className=" py-4 hover:underline underline-offset-4 hover:bg-gray-200 px-3 rounded-md text-sm xl:text-lg pb-2"><HiPencil className="float-right mx-1"></HiPencil>Registrar Perforadora</li></Link>
                <Link to="Formulario/Condicion"><li className="py-4 hover:underline underline-offset-4 px-3  hover:bg-gray-200 rounded-md text-sm  xl:text-lg pb-2"><HiOutlineClipboardList className="float-right mx-1 mt-1"></HiOutlineClipboardList>Condicion de Perforadora</li></Link>
                <Link to="Formulario/Historial"><li className="py-4 hover:underline underline-offset-4 px-3  hover:bg-gray-200 rounded-md text-sm pb-2  xl:text-lg "><HiOutlineBookOpen className="float-right mx-1 mt-1"></HiOutlineBookOpen>Historial de Condiciones</li></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col 2xl:w-[23rem] md:w-[23.7rem]  xl:w-[18rem] xl:mr-2">
          <div className="bg-right bg-no-repeat bg-cover h-[20rem] rounded-t-2xl  rounded-b-sm" style={TrasladoIMG}>
            <div className=" w-[16rem] h-full md:w-full  bg-gray-700 bg-opacity-60 rounded-t-2xl">
              <p className="text-white p-3 pt-20 text-sm md:text-lg">Área donde se desarrollaran los Traslado de la maquinaria áqui encontraras información
                    y de los horarios de traslados. 
              </p>
            </div>
          </div>
          <div className="container md:mr-5 mb-5 relative  w-[256px] md:w-[380px] xl:w-[400px] overflow-hidden ">
            <input type="checkbox"  className="absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer peer"></input>
            <div className="bg-gray-700 h-12 w-full pl-3 xl:w-[18rem]  2xl:w-[23rem] flex items-center border-xl rounded-t-l-lg 2xl:py-7">
              <h1 className="text-sm font-semibold pr-2 xl:text-lg  text-gray-200">Traslado Perforadora</h1>
            </div>
            <div className="absolute top-3 right-3 xl:-translate-x-32  2xl:-translate-x-7 text-white transition-transform duration-500 ml-4 rotate-0 peer-checked:rotate-180">
              <HiChevronDown size="30"></HiChevronDown>
            </div>
            <div className="bg-white overflow-hidden xl:w-[18rem] 2xl:w-[23rem] transition-all duration-500 rounded-b-lg max-h-0 peer-checked:max-h-96">
              <div className="py-3 list-none">
                <Link to="Formulario"><li className=" py-4 hover:underline underline-offset-4 hover:bg-gray-200 px-3 rounded-md text-sm xl:text-lg pb-2"><HiPencil className="float-right mx-1"></HiPencil>Registrar Perforadora</li></Link>
                <Link to="Formulario/Condicion"><li className="py-4 hover:underline underline-offset-4 px-3  hover:bg-gray-200 rounded-md text-sm  xl:text-lg pb-2"><HiOutlineClipboardList className="float-right mx-1 mt-1"></HiOutlineClipboardList>Condicion de Perforadora</li></Link>
                <Link to="Formulario/Historial"><li className="py-4 hover:underline underline-offset-4 px-3  hover:bg-gray-200 rounded-md text-sm pb-2  xl:text-lg "><HiOutlineBookOpen className="float-right mx-1 mt-1"></HiOutlineBookOpen>Historial de Condiciones</li></Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col 2xl:w-[23rem] md:w-[23.7rem] xl:w-[18rem] xl:mr-2">
          <div className="bg-left bg-no-repeat bg-cover h-[20rem] rounded-t-2xl  rounded-b-sm" style={SondajeIMG}>
            <div className=" w-[16rem] h-full md:w-full  bg-gray-700 bg-opacity-60 rounded-t-2xl">
              <p className="text-white p-3 pt-20 text-sm md:text-lg">Área donde se desarrollaran los metros de sondaje para las tronaduras en esta sección encontraras información 
                    de los horarios y los metros de sondajes. 
              </p>
            </div>
          </div>
          
          <div className="container md:mr-5 mb-5 relative  w-[256px] md:w-[380px] xl:w-[400px] overflow-hidden ">
            <input type="checkbox"  className="absolute top-0 inset-x-0 w-full h-12 opacity-0 z-10 cursor-pointer peer"></input>
            <div className="bg-gray-700 h-12 w-full pl-3 xl:w-[18rem] 2xl:w-[23rem] flex items-center border-xl rounded-t-l-lg 2xl:py-7">
              <h1 className="text-sm font-semibold pr-2 xl:text-lg  text-gray-200">Metros Sonadaje</h1>
            </div>
            <div className="absolute top-3  right-3 xl:-translate-x-32 2xl:-translate-x-7 text-white transition-transform duration-500 ml-4 rotate-0 peer-checked:rotate-180">
              <HiChevronDown size="30"></HiChevronDown>
            </div>
            <div className="bg-white overflow-hidden xl:w-[18rem] 2xl:w-[23rem] transition-all duration-500 rounded-b-lg max-h-0 peer-checked:max-h-96">
              <div className="py-3 list-none">
                <Link to="Formulario"><li className=" py-4 hover:underline underline-offset-4 hover:bg-gray-200 px-3 rounded-md text-sm xl:text-lg pb-2"><HiPencil className="float-right mx-1"></HiPencil>Registrar Perforadora</li></Link>
                <Link to="Formulario/Condicion"><li className="py-4 hover:underline underline-offset-4 px-3  hover:bg-gray-200 rounded-md text-sm  xl:text-lg pb-2"><HiOutlineClipboardList className="float-right mx-1 mt-1"></HiOutlineClipboardList>Condicion de Perforadora</li></Link>
                <Link to="Formulario/Historial"><li className="py-4 hover:underline underline-offset-4 px-3  hover:bg-gray-200 rounded-md text-sm pb-2  xl:text-lg "><HiOutlineBookOpen className="float-right mx-1 mt-1"></HiOutlineBookOpen>Historial de Condiciones</li></Link>
              </div>
            </div>
          </div>
        </div>

       
      </div>    
    </section>
  )
}

{/* <h1 className="text-amber-500 text-center pt-5">Tronadura Programada</h1>
<h1 className="text-amber-500 text-center pt-5">Metros de Sondajes</h1>
<h1 className="text-amber-500 text-center pt-5">Traslado de Perforadora</h1> */}

{/* <Link to="Formulario"><li className="pt-5 hover:underline underline-offset-4 hover:bg-gray-200 pb-2"><HiPencil className="float-right mr-10"></HiPencil>Registrar Perforadora</li></Link>
<Link to="Formulario/Condicion"><li className="pt-4 hover:underline underline-offset-4 hover:bg-gray-200 pb-2"><HiOutlineClipboardList className="float-right mr-10"></HiOutlineClipboardList>Ver Condicion de Perforadora</li></Link>
<li className="pt-4 hover:underline underline-offset-4 hover:bg-gray-200 pb-2"><HiOutlineBookOpen className="float-right mr-10"></HiOutlineBookOpen>Ver Historial de Perforadora</li> */}
export default AdminPerforacion
