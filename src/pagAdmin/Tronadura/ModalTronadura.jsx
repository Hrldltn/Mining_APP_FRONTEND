import {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import useCondicion from "../../hooks/useCondicion"
import CerrarBtn from '../../assets/img/cerrar.svg'
import { downloadExcel  } from 'react-export-table-to-excel';


let CamposTronadura = ['columna1','columna2','columna3','columna4','columna5']
let arrayVert = ['','','','','']

const Modal = ({setModal,animarModal,setAnimarModal}) => {


    const [DataCampos,setDataCampos] = useState(CamposTronadura)
    const [MapVer,setMapVer] = useState(arrayVert)


    const { tronadura,editarTronadura, eliminarTronadura } = useCondicion(2)
    const {Fecha_programada, createdAt,Nombre_doc,tabla_columna,tabla_contenido,updatedAt,user,_id } = tronadura
    const ocultarModal=() =>{
        setAnimarModal(false)
        
        setTimeout(() =>{
          setModal(false)
        },500)
      }

    let [updateTable, setUpadeTable] = useState(false)
    let [loadData, setLoadData] = useState(false)

    if(loadData == false)
    {
        setDataCampos(tronadura.tabla_columna)
        setMapVer(tronadura.tabla_contenido)
        setLoadData(true)
    }

    let updateArray = () =>
    {
        console.log("reload-Table")
        console.log(tronadura)

        console.log(tronadura.tabla_contenido)
        let objectarray = tronadura.tabla_columna
        let vertialArray = [...MapVer]
        for( var i = 0; i < objectarray.length; i++)
        {
        var columTable = document.getElementsByName("ColumnaTabla-" + i)
            columTable[0].value = tronadura.tabla_columna[i]

            //console.log(columTable[0].value)

        }

        console.log(vertialArray.length)
        for( var x = 0; x < vertialArray.length; x++)
        {
            console.log(objectarray)
            for( var i = 0; i < objectarray.length; i++)
            {
                var contenTable = document.getElementsByName("ContenidoTabla-" + x + '-' + i)
                contenTable[0].value = tronadura.tabla_contenido[x][i]


                //console.log(contenTable[0].value)
                
            } 
        }


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
            fileName: Nombre_doc,
            sheet: "Hoja1",
            tablePayload: {
              header: objectarray,
              body: tonaduraTable,
            },
          });
      
    }



    useEffect(() => {
    if(updateTable == false)
        {
            setUpadeTable(true)
            updateArray()
        }

    })

    


    return(
        <div className="modal flex flex-col h-screen ">
            <div className='overflow-y-auto'>
                <div className="cerrar-modal ">
                    <img src={CerrarBtn} alt="cerrar modal" className="w-5 h-5 md:w-7 md:h-7 hover:cursor-pointer xl:-translate-x-20" onClick={ocultarModal}></img>
                </div>
                
                <div className="mt-20 w-screen h-screen xl:h-3/4 md:w-1/2 md:mr-0 flex flex-col xl:flex-row xl:ml-60 md:ml-40 2xl:ml-96 ">
                    <div className={`formulario ${animarModal ? 'animar' : 'cerrar'} h-screen w-screen px-5 `}>
                    <p className="font-bold text-gray-700 m-4">Nombre de documento:
                        <span className="font-normal normal-case text-white pl-1"> {Nombre_doc}</span>
                    </p>
                    <p className="font-bold text-gray-700 m-4">Fecha Programada:
                        <span className="font-normal normal-case text-white pl-1"> {Fecha_programada}</span>
                    </p>
                    <p className="font-bold text-gray-700 m-4">Creado el:
                        <span className="font-normal normal-case text-white pl-1"> {createdAt}</span>
                    </p>
                    <p className="font-bold text-gray-700 m-4">Fecha de actualización:
                        <span className="font-normal normal-case text-white pl-1"> {updatedAt}</span>
                    </p>
                    <p className="font-bold text-gray-700 m-4">Ingresado por:
                        <span className="font-normal normal-case text-white pl-1"> {user}</span>
                    </p>
                        <div className="flex flex-row">
                        <Link to="/admin/Perforacion/Tronadura"><input type="button" value="Editar" className="bg-gradient-to-r from-gray-600 to-gray-700  shadow-sm shadow-gray-600/50  rounded-xl w-40 p-2  font-bold md:text-xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-300 duration-300 mr-5" onClick={() => editarTronadura(tronadura)}></input></Link>
                        <input type="button" value="Eliminar" className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-sm shadow-gray-600/50  rounded-xl w-40 p-2  font-bold md:text-xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-300 duration-300 mr-5 " onClick={() => eliminarTronadura(_id)}></input>
                        <button onClick={()=>ExportarDatos()} className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-sm shadow-gray-600/50  rounded-xl w-40 p-2  font-bold md:text-xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-300 duration-300 mr-5 ">Exportar</button>  
                        </div>
                        <br/>
                        <div className='overflow-x-scroll'>
                        <table className="shadow-xl w-full text-gray-500 dark:text-gray-400 overflow-y-scroll">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="bg-slate-300 border-b dark:bg-gray-800 dark:border-gray-700">
                                {DataCampos.map((dato1, indice) =>
                                {
                                return <th key={indice}  className="bg-transparent border-2 border-gray-400 border-y-gray-500"><input readOnly name={"ColumnaTabla-" + indice} className='bg-transparent text-center text-base'></input></th>
                                })}
                                </tr>
                            </thead>
                            <tbody>
                                {MapVer.map((dato1,indice1) =>{
                                return <tr key={indice1} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    {DataCampos.map((dato2, indice2) =>
                                    {
                                        return <th key={indice2} className="border-2 border-gray-400 border-y-gray-500"><input readOnly name={"ContenidoTabla-" + indice1 + "-" + indice2} className='text-center'></input></th>
                                    })}
                                </tr>
                                })}
                            </tbody>
                        </table>
              </div>    
              
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Modal