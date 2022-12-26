import {useState, useEffect, useRef} from 'react'
import{ Link } from 'react-router-dom'
import Alerta from '../../components/Alerta'
import useCondicion from  '../../hooks/useCondicion'
import useAuth from '../../hooks/useAuth'
import { downloadExcel  } from 'react-export-table-to-excel';
import * as XLSX from "xlsx"


let CamposTronadura = ['','']
let arrayVert = ['','']

const Tronadura = () => {

  const { auth } = useAuth()
  const [perfil , setPerfil]=useState({})
  const[Nombre,setNombre]=useState('')
  const [Fecha, setFecha] = useState('')

  const[tronaduraDoc, settronaduraDoc] = useState('')
  const[id,setId]=useState(null)

  const [DataCampos,setDataCampos] = useState(CamposTronadura)
  const [MapVer,setMapVer] = useState(arrayVert)
  const ContenFile = useState([])

  let [PagDoc,setPagDoc] = useState(1)

  let Celval = useRef(null)
  const [FileDox, setFilesDox] = useState(null)
  const [sheetValues, setsheetValues] = useState(null)

  const {nombre , apellido , correo , telefono, area } = perfil

  const[edicion,setEdicion]=useState(false)
 
  const[alerta , setAlerta]=useState({})

  let user = nombre + ' ' + apellido

  
  const {guardarTronadura,tronadura} = useCondicion(2)


  useEffect(() => {
    setPerfil(auth)
  },[auth])

  let [receptData, setRecepData] = useState(false)

  useEffect(()=>{
    if(tronadura?.Nombre_doc){
      setNombre(tronadura.Nombre_doc)
      setFecha(tronadura.Fecha_programada.slice(0,-8))
      setId(tronadura._id)


      setDataCampos(tronadura.tabla_columna)
      setMapVer(tronadura.tabla_contenido)

      setRecepData(true)



      setEdicion(true)
    }},[tronadura])

  useEffect(()=>
  {
    if(receptData == true)
    {
      setRecepData(false)

        let objectarray = tronadura.tabla_columna
        let vertialArray = [...MapVer]
        for( var i = 0; i < objectarray.length; i++)
        {
        var columTable = document.getElementsByName("ColumnaTabla-" + i)
            columTable[0].value = tronadura.tabla_columna[i]

        }

        for( var x = 0; x < vertialArray.length; x++)
        {
            for( var i = 0; i < objectarray.length; i++)
            {
                var contenTable = document.getElementsByName("ContenidoTabla-" + x + '-' + i)
                contenTable[0].value = tronadura.tabla_contenido[x][i]
            } 
        }

    }
  })



// temporaldate.getFullYear().toString() + 

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
    let nameExel = ""

    if(Nombre == "")
    {
      nameExel = "Tabla-Tronadura"
    }
    else
    {
      nameExel = Nombre
    }
    
      downloadExcel({
          fileName: nameExel,
          sheet: "Hoja1",
          tablePayload: {
            header: objectarray,
            body: tonaduraTable,
          },
        });
    
  }

  let [UpdateFile, setUpdateFile] = useState(0);
  let [UpdateData, setUpadteData] = useState(0)
  useEffect(() => {
    if (UpdateFile == 1)
    {
      ReceptTable() 
    }
    if(UpdateData == 1)
    {
      setUpadteData(0)
      guardarTronadura(tronaduraDoc)
      setUpadteData(0)
      console.log("end-process")
    }
  });

  const ImportValues = () =>
  {
    let range = FileDox.SheetNames.length
    console.log(range)
    if(PagDoc > range)
    {
      alert("operación cancelada, Hoja no detectada")
    }
    else
    {
      let currentFile = document.getElementsByName("InputFile")
      if(currentFile[0].value == "")
      {
        alert("operación cancelada, ningún documento seleccionado")
      }
      else
      {
        var worksheet = FileDox.Sheets[FileDox.SheetNames[PagDoc - 1]]

        
        let PartidaColumna = document.getElementsByName("columna_inicio")[0].value
        let FinalColumna = document.getElementsByName("columna_final")[0].value

        let PartidaFila = document.getElementsByName("fila_inicio")[0].value
        let FinalFila = document.getElementsByName("fila_final")[0].value
    
        let ColumnLength=[]
        let CellsLength = []
        setDataCampos([])
        setMapVer([])

        let rangeCells = FinalFila - PartidaFila
        for(let i = 0; i < rangeCells; i++)
        {
          CellsLength.push('')
          setMapVer(CellsLength)
        }

        for(let i = convertLetterToNumber(PartidaColumna) - 1; i < convertLetterToNumber(FinalColumna); i++)
        {
          ColumnLength.push('')
          setDataCampos(ColumnLength)
          
          const colum = getLetter(i).toUpperCase()
          let Arraycolum = []
          for(let x = PartidaFila - 1; x < FinalFila; x++)
          {
            let valcell = worksheet[colum + (x + 1).toString()];
            
            Arraycolum.push(valcell)
          }

          ContenFile.push(Arraycolum)
        }
        setsheetValues(ContenFile)
        setUpdateFile(1)
      }
    }
  }
  const ReceptTable = () =>
  {

    var contenTable = ""
    for( var i = 0; i < DataCampos.length; i++)
    {
      let values = sheetValues[2 + i][0];
      var contenTable = document.getElementsByName("ColumnaTabla-" + i)
      if(typeof values === 'undefined') 
      {
        contenTable[0].value = ""
      }
      else
      {
        contenTable[0].value = Object.values(values)[Object.values(values).length - 1]
      }
    }
    for( var x = 0; x < MapVer.length; x++)
    {
      for( var i = 0; i < DataCampos.length; i++)
      {
        let values = sheetValues[2 + i][x + 1];
        var contenTable = document.getElementsByName("ContenidoTabla-" + x + '-' + i)
        if(typeof values === 'undefined') 
        {
          contenTable[0].value = ""
        }
        else
        {
          contenTable[0].value = Object.values(values)[Object.values(values).length - 1]
        }
      } 
    }
    setUpdateFile(0)
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



  const handleSubmit= async e =>{
    
    e.preventDefault()

    let TemporaltronaduraDoc = {}
    let tonaduraTable = []
    let arrayDoc = []
    let objectarray = [...DataCampos]
    let vertialArray = [...MapVer]
    let HourVal = document.getElementsByName("meeting-time")
    
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

    if(id== null)
    {
      TemporaltronaduraDoc = {'Nombre_doc':Nombre,'Fecha_programada': HourVal[0].value, 'tabla_columna': objectarray, 'tabla_contenido': tonaduraTable, 'user': user}
    }
    else
    {
      TemporaltronaduraDoc = {id,'Nombre_doc':Nombre,'Fecha_programada': HourVal[0].value, 'tabla_columna': objectarray, 'tabla_contenido': tonaduraTable, 'user': user}
    }
    
    settronaduraDoc(TemporaltronaduraDoc)
  
    setAlerta({})
    HourVal[0].value = ""
    setNombre("")
    setAlerta({msg:'Tronadura Registrada Correctamente', error:false})
    
    if(edicion){
      setAlerta({msg:'Tronadura Editada Correctamente', error:false})
      setTimeout(() => {
        setAlerta({})
        return window.location.href = "Programa";
      },1300)
    }

    setUpadteData(1)

    setTimeout(() => {
      setAlerta({})
    },1500)
    
  }



  const readExelFilel = (file) =>{

      const promise = new Promise((resolve, reject) =>{
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) =>{
      const bufferArray = e.target.result;
        
      const wb = XLSX.read(bufferArray,{type:'buffer'})
      var workbook = XLSX.readFile(bufferArray,{type:'buffer'})
    
      setFilesDox(workbook)

      } 
      fileReader.onerror = (error) =>
       {
        reject(error)
      }
    })
  }

  const {msg} = alerta
  return (
    <>
     
      <div className= "bg-gray-100 md:mx-3 md:py-3 rounded-xl md:mt-5 xl:mt-8 md:ml-3">
        <div >
          <h1 className="text-gray-700 font-black text-2xl md:text-4xl text-center pt-10 mb-5 md:mb-12">{id ? 'Modificación de Tronadura': 'Registro de Tronadura'}</h1>
        </div>
        {msg && <Alerta alerta={alerta}/>}
            

        <form onSubmit={handleSubmit}>   
            <br/>
            <div className="px-4 md:px-20">
            <label className="uppercase text-gray-600 block md:text-xl text-lg font-bold">
              Nombre de Tronadura:
            </label>
            <input type="text" placeholder="Ingrese el Nombre" className="border w-full p-3 mt-3 md:text-xl text-lg bg-gray-50 rounded-xl" value={Nombre} onChange={e => setNombre(e.target.value)} required></input>
            <br/><br/>
            <label className="uppercase text-gray-600 block md:text-xl text-lg font-bold">
              Fecha a programar:
            </label>
            <br/>
            <input type="datetime-local" name="meeting-time" min="2018-06-07T00:00" max="2118-06-14T00:00" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={Fecha} onChange={e => setFecha(e.target.value)}></input> 
            <br/><br/>
              <div className='overflow-x-scroll'>
                  <table className="shadow-xl w-full text-gray-500 dark:text-gray-400 overflow-y-scroll">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="bg-slate-300 border-b dark:bg-gray-800 dark:border-gray-700">
                        {DataCampos.map((dato, indice) =>
                        {
                          return <th key={indice}  className="bg-transparent border-2 border-gray-400 border-y-gray-500"><input className='bg-transparent text-center text-base' name={"ColumnaTabla-" + indice} ref={Celval} ></input></th>
                        })}
                        </tr>
                    </thead>
                    <tbody>
                        {MapVer.map((dato1,indice1) =>{
                          return <tr key={indice1} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            {DataCampos.map((dato, indice2) =>
                              {
                                return <th key={indice2} className="border-2 border-gray-400 border-y-gray-500"><input className='text-center' name={"ContenidoTabla-" + indice1 + "-" + indice2} ref={Celval} ></input></th>
                              })}
                          </tr>
                        })}
                    </tbody>
                  </table>
              </div> 
            </div>
            <div className="px-4 md:px-20 mt-5 py-5 flex flex-col items-center">
              <input type="submit" value={id ? 'Guardar Cambios': 'Registrar Tronadura'}  className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-600/50  rounded-xl w-full p-2 mt-3 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300"></input>
              <br/>
              <button onClick={()=>ExportarDatos()} className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-600/50  rounded-xl w-full p-1 mt-1 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300">Exportar</button>           
            </div>   
        </form>
        <br/><br/>
        <div className="px-4 md:px-20">
                <div className='flex flex-row'>
                  <button onClick={()=>HorizontalCells(1)} className="bg-gradient-to-r from-green-900 to-green-400 shadow-lg shadow-gray-600/50  rounded-xl w-full p-1 mt-1 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300">+ Columna</button>
                  <button onClick={()=>HorizontalCells(2)} className="bg-gradient-to-r from-red-400 to-red-900 shadow-lg shadow-gray-600/50  rounded-xl w-full p-1 mt-1 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300">- Columna</button>
                </div>
                <br/>
                <div className='flex flex-row'>
                  <button onClick={()=>VerticalCells(1)} className="bg-gradient-to-r from-green-900 to-green-400 shadow-lg shadow-gray-600/50  rounded-xl w-full p-1 mt-1 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300">+ Fila</button>            
                  <button onClick={()=>VerticalCells(2)} className="bg-gradient-to-r from-red-400 to-red-900 shadow-lg shadow-gray-600/50  rounded-xl w-full p-1 mt-1 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300">- Fila</button>            
                </div>
                <br/>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Columna inicial</label>
                    <input type="text" name = "columna_inicio" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="A" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Columna Final</label>
                    <input type="text" name="columna_final" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Z" />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fila inicial</label>
                    <input type="number" name = "fila_inicio" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fila Final</label>
                    <input type="number" name="fila_final" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="100" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Columna Final</label>
                    <input type="number" name="numero_documento" value={PagDoc} onChange={(e)=>setPagDoc((e.target.value))} min="1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" />
                  </div>
                </div>
                <br/>
                <input type="file" onChange={(e) => {const file = e.target.files[0];readExelFilel(file);}} className="form-control
    block
    w-full
    px-2
    py-1
    text-sm
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" name ="InputFile"/>
                <br/><br/>
                <button onClick={ImportValues} className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-lg shadow-gray-600/50  rounded-xl w-full p-1 mt-1 font-bold md:text-2xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-100 duration-300">Importar</button>
                <br/><br/>
        </div>
      </div>
    </>
  )
}


export default Tronadura