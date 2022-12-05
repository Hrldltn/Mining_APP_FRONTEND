import {useState,useEffect, useRef} from 'react'

import Alerta from '../../components/Alerta'
import useAuth from '../../hooks/useAuth'
import {useTronadura} from  '../../hooks/useCondicion'
import {useCondicion} from  '../../hooks/useCondicion'
import { downloadExcel  } from 'react-export-table-to-excel';


let CamposTronadura = ['','']
let arrayVert = ['','']

const DataTronadura = () => {
  
  
  const { auth } = useAuth()
  const [perfil , setPerfil]=useState({})
  const[cantidad,setCantidad]=useState('')
  const[estado,setEstado]=useState('')
  const[modelo,setModelo]=useState('')
  const[Nombre,setNombre]=useState('')
  const[id,setId]=useState(null)
  const [DataCampos,setDataCampos] = useState(CamposTronadura)
  const [MapVer,setMapVer] = useState(arrayVert)
  
  // const {guardarTronadura} = useTronadura()
  let Celval = useRef(null)
  const [file, setFiles] = useState(null)
  const ExelFile = useRef()

  
  const {nombre , apellido , correo , telefono, area } = perfil
  const[edicion,setEdicion]=useState(false)
 
  const[alerta , setAlerta]=useState({})

  let user = nombre + ' ' + apellido


  const HorizontalCells = (result) =>
  {
    let objectarray = [...DataCampos]
    
    if(result == 1)
    {
      objectarray.push('')
    }
    else
    {
      objectarray.pop()
    }

    setDataCampos(objectarray)

  }

  const VerticalCells = (result) =>
  {
    let objectarray = [...MapVer]

    if(result == 1)
    {
      objectarray.push('')
    }
    else
    {
      objectarray.pop()
    }

    setMapVer(objectarray)
  }

  const ExportarDatos = () =>
  {

    let tonaduraTable = []
    let arrayDoc = []
    let objectarray = [...DataCampos]
    let vertialArray = [...MapVer]

    for( var i = 0; i < objectarray.length; i++)
    {
      var columTable = document.getElementsByName("ColumnaTabla-" + i)
          arrayDoc.push(columTable[0].value)

    }
    objectarray = arrayDoc
    arrayDoc = []
    for( var x = 0; x < vertialArray.length; x++)
    {
      for( var i = 0; i < objectarray.length; i++)
      {
          var contenTable = document.getElementsByName("ContenidoTabla-" + x + '-' + i)
          arrayDoc.push(contenTable[0].value)
        }
        tonaduraTable.push(arrayDoc) 
        arrayDoc = []   
    }

    
      downloadExcel({
          fileName: "Tronadura-" + Nombre,
          sheet: Nombre,
          tablePayload: {
            header: objectarray,
            body: tonaduraTable,
          },
        });
    
  }

  

  const ImportValues = () =>
  {
    
    let currentFile = document.getElementsByName("InputFile")
    let PartidaColumna = document.getElementsByName("columna_inicio")[0].value
    let FinalColumna = document.getElementsByName("columna_final")[0].value
    let PartidaFila = document.getElementsByName("fila_inicio")[0].value
    let FinalFila = document.getElementsByName("fila_final")[0].value
    let documento = document.getElementsByName("numero_documento")[0].value

    console.log(currentFile[0].value)
    
    var workfile = XLSL.readFile(currentFile[0].value)

    console.log(file)

  


    let PuntoColumna = 0
    let acumulatedCells = 0
    let MultipledCells = 26
    let objectarray = []

    if(currentFile[0].value == "")
    {
      alert("operación cancelada, ningun documento seleccionado")
    }
    else
    {
      for(let i = convertLetterToNumber(PartidaColumna) - 1; i < convertLetterToNumber(FinalColumna); i++)
      {
        console.log(workSheet['{index}$1'.format=(index = getLetter(i))])
        console.log(getLetter(i))
      }

      //setDataCampos(objectarray)
      console.log(currentFile)
    }
  }

  function convertLetterToNumber(str) {
    if ((typeof str === "string" || str instanceof String) && /^[a-zA-Z]+$/.test(str)) {
      str = str.toUpperCase();
      let out = 0,
        len = str.length;
      for (let pos = 0; pos < len; pos++) {
        out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
      }
      return out;
    } else {
      return undefined;
    }
  }

  function getLetter(num){
    var ordA = 'a'.charCodeAt(0);
    var ordZ = 'z'.charCodeAt(0);
    var len = ordZ - ordA + 1;

    var s = "";
    while(num >= 0) {
      s = String.fromCharCode(num % len + ordA) + s;
      num = Math.floor(num / len) - 1;
    }
    return s;
  }

  const {guardarTrona,registro} = useCondicion()
  useEffect(() => {
    setPerfil(auth)

  },[auth])

  
  useEffect(()=>{
    if(registro?.Nombre){
      setNombre(registro.Nombre)
      setCantidad(registro.cantidad)
      setEstado(registro.estado)
      setModelo(registro.modelo)
      setId(registro._id)
      setEdicion(true)
    }
    
    
  },[registro])
  


  const handleSubmit= async e =>{
    
    e.preventDefault()

    let tronaduraDoc = {}
    let tonaduraTable = []
    let arrayDoc = []
    let objectarray = [...DataCampos]
    let vertialArray = [...MapVer]
    let HourVal = document.getElementsByName("meeting-time")[0].value
    console.log("Fecha: " + HourVal)
    for( var i = 0; i < objectarray.length; i++)
    {
      var columTable = document.getElementsByName("ColumnaTabla-" + i)
          arrayDoc.push(columTable[0].value)

    }
    objectarray = arrayDoc
    arrayDoc = []
    for( var x = 0; x < vertialArray.length; x++)
    {
      for( var i = 0; i < objectarray.length; i++)
      {
          var contenTable = document.getElementsByName("ContenidoTabla-" + x + '-' + i)
          arrayDoc.push(contenTable[0].value)
        }
        tonaduraTable.push(arrayDoc) 
        arrayDoc = []   
    }

      tronaduraDoc = {'Nombre':Nombre,'Columnas':objectarray,'Datos':tonaduraTable, 'Fecha': HourVal}
      guardarTronadura({tronaduraDoc})
    /*


    const Tronadura =[cantidad,Nombre,estado,modelo]
    if(Tronadura.includes('') || 
        Tronadura.includes('Default') || 
        Tronadura.includes('Null')){
      setAlerta({msg:'Los campos no pueden estar vacios', error:true})
      return;
    }
    

    setAlerta({})
    
    guardarTronadura({cantidad,Nombre,estado,modelo,id,user})
    
    setCantidad('')
    setEstado('')
    setModelo('')
    setNombre('')
    setAlerta({msg:'Perforadora Registrada Correctamente', error:false})
    
    if(edicion){
      setAlerta({msg:'Perforadora Editada Correctamente', error:false})
      setTimeout(() => {
        setAlerta({})
        return window.location.href = "Formulario/Condicion";
      },1300)
    }

    setTimeout(() => {
      setAlerta({})
    },1500)
    */
    
  }


  const {msg} = alerta
  return (
    <>
     
      <div className= "bg-gray-100 md:mx-3 md:py-3 rounded-xl md:mt-5 xl:mt-8 md:ml-3">
        <div >
          <h1 className="text-gray-700 font-black text-2xl md:text-4xl text-center pt-10 mb-5 md:mb-12">{id ? 'Modificación de Tronadura': 'Registro de Tronadura'}</h1>
        </div>
        {msg && <Alerta alerta={alerta}/>}
        <div className="px-4 md:px-20">
                <label className="uppercase text-gray-600 block md:text-xl text-lg font-bold">
                  Nombre de Tronadura:
                </label>
                <input type="text" placeholder="Ingrese el Nombre" className="border w-full p-3 mt-3 md:text-xl text-lg bg-gray-50 rounded-xl" value={Nombre} onChange={e => setNombre(e.target.value)}></input>
            </div>
            <br/>
            <div className="px-4 md:px-20">
                <div>
                  <button onClick={()=>HorizontalCells(1)} className="bg-gradient-to-r from-green-400 to-green-900 shadow-lg shadow-gray-600/50  rounded-xl w-full p-1 mt-1 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300">+ columna</button>
                  <button onClick={()=>HorizontalCells(2)} className="bg-gradient-to-r from-red-400 to-red-900 shadow-lg shadow-gray-600/50  rounded-xl w-full p-1 mt-1 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300">- columna</button>
                </div>
                <br/>
                <div>
                  <button onClick={()=>VerticalCells(1)} className="bg-gradient-to-r from-green-400 to-green-900 shadow-lg shadow-gray-600/50  rounded-xl w-full p-1 mt-1 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300">+ fila</button>            
                  <button onClick={()=>VerticalCells(2)} className="bg-gradient-to-r from-red-400 to-red-900 shadow-lg shadow-gray-600/50  rounded-xl w-full p-1 mt-1 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300">- fila</button>            
                </div>
                <br/>           
                <button onClick={()=>ExportarDatos()} className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-600/50  rounded-xl w-full p-1 mt-1 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300">Exportar</button>
                <br/><br/>
                <button onClick={ImportValues} className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-600/50  rounded-xl w-full p-1 mt-1 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300">Realizar importación</button>            
                <br/><br/>
                <input type="file" ref={(ExelFile)}  onChange={() => setFiles(ExelFile.current.files[0])} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" name ="InputFile"/>
                <input type="text" name = "columna_inicio" placeholder="Columna inicial"></input>
                <input type="text" name="columna_final" placeholder="Columna final"></input>
                <input type="number" name = "fila_inicio" placeholder="Fila inicial"></input>
                <input type="number" name="fila_final" placeholder="Fila final"></input>
                <input type="number" name="numero_documento" placeholder="Numero de documento"></input>
                <br/><br/>
                <input type="datetime-local" name="meeting-time" min="2018-06-07T00:00" max="2118-06-14T00:00"></input> 
            </div>

        <form onSubmit={handleSubmit}>   
            <br/>
            <div className="px-4 md:px-20">
                <table className="shadow-xl w-full text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="bg-slate-300 border-b dark:bg-gray-800 dark:border-gray-700">
                        {DataCampos.map((dato, indice) =>
                        {
                          return <th key={indice} scope="col" className="bg-transparent border-2 border-gray-400 border-y-gray-500"><input className='bg-transparent text-center text-base md:container md:mx-auto' name={"ColumnaTabla-" + indice} ref={Celval} ></input></th>
                        })}
                        </tr>
                    </thead>
                    <tbody>

                        {MapVer.map((dato1,indice1) =>{
                          return <tr key={indice1} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            {DataCampos.map((dato, indice2) =>
                              {
                                return <th key={indice2} scope="col" className="border-2 border-gray-400 border-y-gray-500"><input className='text-center md:container md:mx-auto' name={"ContenidoTabla-" + indice1 + "-" + indice2} ref={Celval} ></input></th>
                              })}
                          </tr>
                        })}

                    </tbody>
                </table>
            </div>
        
            <div className="px-4 md:px-20 mt-5 py-5 flex flex-col items-center">
              <input type="submit" value={id ? 'Guardar Cambios': 'Registrar Tronadura'}  className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-600/50  rounded-xl w-full p-2 mt-3 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300"></input>
            </div>
        </form>
      </div>
    </>
  )
}


export default DataTronadura