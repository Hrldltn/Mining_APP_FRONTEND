import {useState,useEffect,useRef,useCallback} from 'react'
import useCondicion from '../../hooks/useCondicion'
import { jsPDF } from "jspdf";
import BarChart from '../../components/Graph/BarChart'
import LineChart from '../../components/Graph/LineChart'
import CircleChart from '../../components/Graph/CircleChart'


const Perforadorastatistic = () => {
  const {condiciones} = useCondicion(1)

  var fecha = condiciones.map((data) =>{
        const Fecha=data.fecha.toString().split('T')[0]
        const parts = Fecha.split("-");
        const fechaObjeto = new Date(parts[0], parts[1]-1, parts[2]); // los meses para JS comienzan en 0
        
        //     // Para imprimirlo o obtenerlo en el formato 
        let options = {year: 'numeric', month: 'long', day: 'numeric' };
        const fechaFormateada=fechaObjeto.toLocaleDateString('es-ES', options);
      return fechaFormateada
  })

  const estado = condiciones.map((data) => data.estado)

  let [UpdateInfo, setUpdateInfo] = useState(1)

  let [BegingData, setBegingData] = useState(1)
  let [manTotal, setmanTotal] = useState(0)
  let [buenTotal, setbuenTotal] = useState(0)
  let [malTotal, setmalTotal] = useState(0)
  let [totalPerforadora, setTotalPerforadora] = useState(0)

  let [totalBuenEstado, setTotalBuenEstado] = useState(0)
  let [totalMantencion, setTotalMantencion] = useState(0)
  let [totalMalEstado, setTotalMalEstado] = useState(0)

  let NameEstado = [...new Set(estado)];

  let [estadoPorciento , setEstadoPorciento] = useState({
      
    labels:NameEstado,
    datasets:[{
      label:"Porcentaje de maquinaria por estado" ,
      data:[totalBuenEstado,totalMantencion,totalMalEstado],
      backgroundColor: ['#13E51D','#E5F009','#F00E0E'],
      }]
})

  useEffect(() => {
    if(UpdateInfo == 1)
    {
      // Poner funciones a recargar despues de renderizar
      ReloadData()
      setUpdateInfo(0)
      console.log("endReload")
    }
  })

  const ReloadData = () =>
  {
    var cantidad = 0
    var cantidadbuenos = 0
    var cantidadmantenidos = 0
    var cantidadmalos = 0
    
    for( var i = 0; i < condiciones.length; i++)
    {
      cantidad = cantidad + parseInt(condiciones[i].cantidad)

      if(condiciones[i].estado == "Buen Estado")
      {
        cantidadbuenos = cantidadbuenos + parseInt(condiciones[i].cantidad)
      }
      if(condiciones[i].estado == "En Mantencion")
      {
        cantidadmantenidos = cantidadmantenidos + parseInt(condiciones[i].cantidad)
      }
      if(condiciones[i].estado == "Mal Estado")
      {
        cantidadmalos = cantidadmalos + parseInt(condiciones[i].cantidad)
      }
     
    }
    setTotalPerforadora(cantidad)
    setmanTotal(cantidadmantenidos)
    setbuenTotal(cantidadbuenos)
    setmalTotal(cantidadmalos)


    let totalBueno = ((cantidadbuenos*100)/cantidad).toFixed(2)
    let totalMantencimiento = ((cantidadmantenidos*100)/cantidad).toFixed(2)
    let totalFallados = ((cantidadmalos*100)/cantidad).toFixed(2)
    setTotalBuenEstado(totalBueno)
    setTotalMantencion(totalMantencimiento)
    setTotalMalEstado(totalFallados)
    
    setEstadoPorciento({
      labels:NameEstado,
      datasets:[{
        label:"Porcentaje de maquinaria por estado" ,
        data:[totalBueno,totalMantencimiento,totalFallados],
        backgroundColor: ['#13E51D','#E5F009','#F00E0E'],
        }]
    })
  }

  if(BegingData == 1)
  {
    ReloadData()
    console.log("iniciate")
    setBegingData(0)
  }
  
  var cantidadPerfo = condiciones.map((data) => data.cantidad);

  var detallesMantencion = condiciones.map((data) => data.detallesMantencion.length);
  var detallesMalEstado = condiciones.map((data) => data.detallesMalEstado.length);
 

  //const totalPerforadora = condiciones.map((data) => parseInt(data.cantidad)).reduce((a, b) => (a + b));
  // const totalEstado = condiciones.map((data) => (data.estado)).length;

  const modelo = condiciones.map((data) => data.modelo)
  const mantencionSwitch=estado.includes('En Mantencion');
  const malEstadoSwitch=estado.includes('Mal Estado');
  const buenEstadoSwitch=estado.includes('Buen Estado');

  
  let mantencion=[]
  let malEstado=[]
  let buenEstado=[]
  const NameFecha = [...new Set(fecha)];
  const NameModelo = [...new Set(modelo)];

  if(mantencionSwitch){
    mantencion=condiciones.filter((dato) => dato.estado.includes('En Mantencion'))
  }

  if(malEstadoSwitch){
    malEstado=condiciones.filter((dato) => dato.estado.includes('Mal Estado'))
  }
  if(buenEstadoSwitch){
    buenEstado=condiciones.filter((dato) => dato.estado.includes('Buen Estado'))
  }

  const [cantidadData , setCantidadData] = useState({
      labels:fecha,
      datasets:[{
        label:"Cantidad de perforadoras ingresadas por fecha",
        data:cantidadPerfo,
        backgroundColor: '#42C3FF'
        }]
  });

  const [cantidadEstado , setCantidadEstado] = useState({
      labels:modelo,
      datasets: [
        {
          label: 'Mantención',
          data: detallesMantencion,
          backgroundColor:'#F3FF00',
          borderColor: '#F3FF00',
          yAxisID: 'y',
        },
        {
          label: 'Mal Estado',
          data: detallesMalEstado,
          backgroundColor: '#FF0000',
          borderColor: '#FF0000',
          yAxisID: 'y1',
        }
      ]
  });

   
      function generatePDF(){
        let pdf = new jsPDF()

        const canvasBar = document.getElementById('barChar')
        const imageBar= canvasBar.toDataURL('image/png',1.0)
        
        const canvasCircle = document.getElementById('barCircle')
        const imageCircle= canvasCircle.toDataURL('image/png',1.0)
        
        const canvasLine = document.getElementById('barLine')
        const imageLine= canvasLine.toDataURL('image/png',1.0)

        pdf.addImage(imageBar,15,15,180,150,"alias1")
        pdf.addPage()
        pdf.addImage(imageCircle,15,15,180,150,"alias2")
        pdf.addPage()
        pdf.addImage(imageLine,15,15,190,150,"alias3")
    
        pdf.save("Graficos Perforadora.pdf")
      }
    

  return (
    <>
      <div  className="grid xl:grid-rows-2 xl:grid-flow-col gap-4 justify-items-start">
          <div style={{width:700 ,heigth:900,margin:"auto"}} className="mt-10 xl:mt-0 -translate-y-10">
            <p className="bg-gray-100 shadow-lg p-10 mb-5 rounded-lg text-2xl font-bold" >Total de Perforadoras ingresadas por fecha</p>
            <BarChart chartData={cantidadData}/>
          </div>
          <div style={{width:500 ,heigth:500,margin:"auto"}} className=" mt-10 ">
            <p className="bg-gray-100 shadow-lg p-10 rounded-lg  text-2xl font-bold mb-3" >Porcentaje de maquinarias por estado</p>
            <CircleChart chartData={estadoPorciento}  />
          </div>
          <div style={{width:700 ,heigth:900,margin:"auto"}} className="mt-10 xl:mt-0 -translate-y-10">
            <p className="bg-gray-100 shadow-lg p-9 mb-5 rounded-lg text-2xl font-bold" >Total de Detalles por perforadora según su estado</p>
            <LineChart chartData={cantidadEstado}/> 
          </div>
          <div className="flex gap-4 min-h-40 flex-col text-lg xl:-translate-y-30 text-center xl:mt-0">
              <p className="bg-gray-100 shadow-lg p-10 rounded-lg  text-2xl font-bold" >Total de perforadoras ingresadas</p>
              <div className=" bg-white p-4 rounded-xl flex gap-10 min-h-30 flex-col  xl:flex-row">
                  <p className="bg-gray-300 shadow-lg p-10 font-bold" >Total de perforadoras ingresadas 
                  <br/><br/><span className="font-weight bg-gray-100 p-2 rounded-lg px-7">{totalPerforadora}</span>
                  </p>
                  <p className="bg-gray-300 shadow-lg p-10 font-bold" >Perforadoras en <span className="text-green-600">Buen Estado</span>
                  <br/><br/><span className="font-weight bg-gray-100 p-2 rounded-lg px-7">{buenTotal}</span>
                  </p>
                  <p className="bg-gray-300 shadow-lg p-10 font-bold" >perforadoras en <span className="text-yellow-600">Mantención</span>
                  <br/><br/><span className="font-weight bg-gray-100 p-2 rounded-lg px-7">{manTotal}</span>
                  </p>
                  <p className="bg-gray-300 shadow-lg p-10 font-bold" >perforadoras en <span className="text-red-600">Mal Estado</span>
                  <br/><br/><span className="font-weight bg-gray-100 p-2 rounded-lg px-7">{malTotal}</span>
                  </p>
              </div>
              <button type="button" className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-600/50  rounded-xl  p-2 mb-5 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300" onClick={generatePDF}>Descargar graficos en PDF</button>
              
          </div>
      </div>

    </>
  )
}

export default Perforadorastatistic