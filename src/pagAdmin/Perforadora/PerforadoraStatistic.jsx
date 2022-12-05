import {useState,useEffect,useRef,useCallback} from 'react'
import {useCondicion} from '../../hooks/useCondicion'
import {PieChart,Pie,Sector,Cell} from "recharts"
import { jsPDF } from "jspdf";
import BarChart from '../../components/Graph/BarChart'
import LineChart from '../../components/Graph/LineChart'
import CircleChart from '../../components/Graph/CircleChart'

const Perforadorastatistic = () => {
  const {condiciones} = useCondicion()

  var fecha = condiciones.map((data) =>{
        const Fecha=data.fecha.toString().split('T')[0]
        const parts = Fecha.split("-");
        const fechaObjeto = new Date(parts[0], parts[1]-1, parts[2]); // los meses para JS comienzan en 0
        
        //     // Para imprimirlo o obtenerlo en el formato 
        let options = {year: 'numeric', month: 'long', day: 'numeric' };
        const fechaFormateada=fechaObjeto.toLocaleDateString('es-ES', options);
      return fechaFormateada
  })

  var cantidadPerfo = condiciones.map((data) => data.cantidad);

  var detallesMantencion = condiciones.map((data) => data.detallesMantencion.length);
  var detallesMalEstado = condiciones.map((data) => data.detallesMalEstado.length);
 

  const totalPerforadora = condiciones.map((data) => parseInt(data.cantidad)).reduce((a, b) => (a + b));
  // const totalEstado = condiciones.map((data) => (data.estado)).length;



  const estado = condiciones.map((data) => data.estado)
  const modelo = condiciones.map((data) => data.modelo)
  const mantencionSwitch=estado.includes('En Mantencion');
  const malEstadoSwitch=estado.includes('Mal Estado');
  const buenEstadoSwitch=estado.includes('Buen Estado');

  
  let mantencion=[]
  let malEstado=[]
  let buenEstado=[]
  const NameEstado = [...new Set(estado)];
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

  const manTotal=mantencion.map((data) => parseInt(data.cantidad)).reduce((a, b) => (a + b))
  const buenTotal=buenEstado.map((data) => parseInt(data.cantidad)).reduce((a, b) => (a + b))
  const malTotal=malEstado.map((data) => parseInt(data.cantidad)).reduce((a, b) => (a + b))
  
  const [cantidadData , setCantidadData] = useState({
      labels:fecha,
      datasets:[{
        label:"Cantidad de perforadoras ingresadas por fecha",
        data:cantidadPerfo
        }],
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
          plugins: {
            beforeDraw: (chartCtx) => {
              const ctx = chartCtx.canvas.getContext('2d');
              ctx.save();
              ctx.fillStyle = 'white';
              ctx.fillRect(0, 0, chartCtx.width, chartCtx.height);
              ctx.restore()},
            title: {
              display: true,
              text: 'Chart.js Line Chart - Multi Axis'
            }
          }
        }
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
      ],
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          beforeDraw: (chartCtx) => {
            const ctx = chartCtx.canvas.getContext('2d');
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, chartCtx.width, chartCtx.height);
            ctx.restore()},
          title: {
            display: true,
            text: 'Chart.js Line Chart - Multi Axis'
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',

          }
        }
      }
      

  });
  const [estadoPorciento , setEstadoPorciento] = useState({
      labels:NameEstado,
      datasets:[{
        label:"Porcentaje de maquinaria por estado" ,
        data:[(malTotal*100)/totalPerforadora,(manTotal*100)/totalPerforadora,(buenTotal*100)/totalPerforadora],
        backgroundColor: ['#F00E0E','#E5F009','#13E51D']
        }]
       
        
      });
      const config = {
        type:'pie',
        options:{
          scale:{    
          },
          plugins:{
            tooltip:{
              enabled:false
            },
            datalabels:{
              formatter:(value,context)=>{
                console.log(value)
                return 'hello'
              }
            }
          }
        }
      }

      
      function generatePDF(){
          const canvasBar = document.getElementById('barChar')
      
          const imageBar= canvasBar.toDataURL('image/jpeg',1.0)
          

          let pdf = new jsPDF()
          pdf.setFontSize(20)

          pdf.addImage(imageBar,'JPEG',15,15,185,150)
          pdf.save("barChart.pdf")

      }
      function generatePDFCircle(){
          const canvasCircle = document.getElementById('barCircle')
      
          const imageCircle= canvasCircle.toDataURL('image/jpeg',1.0)
          

          let pdf = new jsPDF()
          pdf.setFontSize(20)

          pdf.addImage(imageCircle,'JPEG',15,15,185,150)
          pdf.save("CircleChart.pdf")

      }
      function generatePDFLine(){
          const canvasLine = document.getElementById('barLine')
          const imageLine= canvasLine.toDataURL('image/jpeg',1.0)
          

          let pdf = new jsPDF()
          pdf.setFontSize(20)

          pdf.addImage(imageLine,'JPEG',15,15,185,150)
          pdf.save("LineChart.pdf")

      }
    
    
 
  return (
    <>
      <div  className="grid xl:grid-rows-2 xl:grid-flow-col gap-4 justify-items-center">
          <div style={{width:700 ,heigth:900,margin:"auto"}} className="mt-10 xl:mt-0">
            <p className="bg-gray-100 shadow-lg p-10 mb-5 rounded-lg text-2xl font-bold" >Total de Perforadoras ingresadas por fecha</p>
            <BarChart chartData={cantidadData} options={cantidadData.options}  plugins={cantidadData.options.plugins} />
            <button type="button" className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-600/50  rounded-xl  p-2 mb-28  mt-3 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300" onClick={generatePDF}>Descargar imagen en PDF</button>
          </div>
          <div style={{width:500 ,heigth:500,margin:"auto"}} className="xl:-translate-y-20 mt-10 xl:mt-0">
            <p className="bg-gray-100 shadow-lg p-10 rounded-lg  text-2xl font-bold mb-3" >Porcentaje de maquinarias por estado</p>
            <CircleChart chartData={estadoPorciento} config={{config}}/>
            <button type="button" className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-600/50  rounded-xl  p-2  mt-7 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300" onClick={generatePDFCircle}>Descargar imagen en PDF</button>
          </div>
          <div style={{width:700 ,heigth:900,margin:"auto"}} className="mt-10 xl:mt-0 -translate-y-7">
            <p className="bg-gray-100 shadow-lg p-9 mb-5 rounded-lg text-2xl font-bold" >Total de Detalles por perforadora según su estado</p>
            <LineChart chartData={cantidadEstado} options={cantidadEstado.options}  plugins={cantidadEstado.options.plugins}/>
            <button type="button" className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-600/50  rounded-xl  p-2 my-8  font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300" onClick={generatePDFLine}>Descargar imagen en PDF</button>
          </div>
          <div className="flex gap-4 min-h-40 flex-col text-lg xl:-translate-y-20 text-center mt-10 xl:mt-0">
              <p className="bg-gray-100 shadow-lg p-10 rounded-lg  text-2xl font-bold" >Total de perforadoras ingresadas</p>
              <div className=" bg-white p-4 rounded-xl flex gap-10 min-h-30 flex-col  xl:flex-row">
                  <p className="bg-gray-300 shadow-lg p-10 font-bold" >Total de perforadoras ingresadas 
                  <br/><br/><span className="font-weight bg-gray-100 p-2 rounded-lg px-7">{totalPerforadora}</span>
                  </p>
                  <p className="bg-gray-300 shadow-lg p-10 font-bold" >Perforadoras en <span className="text-green-600">Buen Estado</span>
                  <br/><br/><span className="font-weight bg-gray-100 p-2 rounded-lg px-7">{buenTotal}</span>
                  </p>
                  <p className="bg-gray-300 shadow-lg p-10 font-bold" >perforadoras en <span className="text-yellow-600">En Mantención</span>
                  <br/><br/><span className="font-weight bg-gray-100 p-2 rounded-lg px-7">{manTotal}</span>
                  </p>
                  <p className="bg-gray-300 shadow-lg p-10 font-bold" >perforadoras en <span className="text-red-600">En Mal Estado</span>
                  <br/><br/><span className="font-weight bg-gray-100 p-2 rounded-lg px-7">{malTotal}</span>
                  </p>
              </div>
              
              
          </div>
      </div>

    </>
  )
}

export default Perforadorastatistic