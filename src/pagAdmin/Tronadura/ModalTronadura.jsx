import {useState , useEffect} from 'react'
import {Link} from 'react-router-dom'
import useCondicion from "../../hooks/useCondicion"
import CerrarBtn from '../../assets/img/cerrar.svg'
import LogoMining from '../../assets/img/logo.png'
import { downloadExcel  } from 'react-export-table-to-excel';
import { jsPDF } from "jspdf";
import { GiConsoleController } from 'react-icons/gi'


let CamposTronadura = ['columna1','columna2','columna3','columna4','columna5']
let arrayVert = ['','','','','']

const Modal = ({setModal,animarModal,setAnimarModal}) => {


    const [DataCampos,setDataCampos] = useState(CamposTronadura)
    const [MapVer,setMapVer] = useState(arrayVert)
    const [DateMode, setDateMode] = useState(true)
    const [datapdf, setDatapdf] = useState([])

    const pdfRender = DateMode


    const { tronadura,editarTronadura, eliminarTronadura } = useCondicion(2)
    const {Fecha_programada, createdAt,Nombre_doc,tabla_columna,tabla_contenido,updatedAt,user,_id } = tronadura
    const ocultarModal=() =>{
        setAnimarModal(false)
        
        setTimeout(() =>{
          setModal(false)
        },500)
      }

    let [updateTable, setUpadeTable] = useState(true)
    let [loadData, setLoadData] = useState(false)

    if(loadData == false)
    {
        setDataCampos(tronadura.tabla_columna)
        setMapVer(tronadura.tabla_contenido)
        setLoadData(true)
    }

    let updateArray = () =>
    {

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

    let updateDoc = () =>
    {
        let datadoc = [...DataCampos]
        let vertialArray = [...MapVer]
        var textdata = ""
        var columdata = ""
        let datarow = 0
        var datadb = []
        for( var x = 0; x < datadoc.length; x++)
        {
            let sizeData = 1
            for( var y = 0; y < vertialArray.length; y++)
            {
                
                if(vertialArray[y][datarow].length > 0)
                {
                    if(y == 0)
                    {
                        textdata = textdata + vertialArray[y][datarow]
                    }
                    else
                    {
                        textdata = textdata +  ", " +vertialArray[y][datarow]
                    }
                }   
            }
            columdata = datadoc[x]
            if (datadoc[x] in datadb)
            {
                if(columdata in datadb)
                {
                    if(columdata in datadb)
                    {
                        columdata = columdata + '-'
                    }
                    columdata = columdata + '-'
                }
                columdata = datadoc[x] + '-'
            }
            datadb.push({Campos:[columdata], Valores:textdata})
            textdata = ""
            columdata = ""
        }   
        setDatapdf(datadb)
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

    const ExportarPDF = () =>
    {
        var pdf = new jsPDF('p', 'pt', 'a4');
        pdf.setFont('courier')
        pdf.setFontSize(20);
        var text1 = "Documento de tronadura " + Nombre_doc,
        xOffset = (pdf.internal.pageSize.width / 2) - (pdf.getStringUnitWidth(text1) * pdf.internal.getFontSize() / 2); 
        pdf.text(text1, xOffset, 40);
        pdf.addImage(LogoMining,'png',150,50,300,150 )
    
     
        pdf.setFontSize(15);

        pdf.line(15, 220 - 20, 580, 220 - 20)
        pdf.line(15, 220 - 20, 15, 280 + 10)
        pdf.line(580, 220 - 20, 580, 280 + 10)
        pdf.line(15, 280 + 10, 580, 280 + 10)
        
        let text2 = "Usuario: " + user
        const textWidth2 = pdf.getTextWidth(text2);
        pdf.text(text2, 20, 220);
        pdf.line(100, 220 + 2, pdf.getStringUnitWidth(text2) + textWidth2 + 10, 220 + 2)
        pdf.setFontSize(15);

        let text3 = "Hora Programada: [Fecha :" + Fecha_programada.slice(0, -14) + '] | [Hora :' + Fecha_programada.slice(11, -5) + ']'
        const textWidth3 = pdf.getTextWidth(text3);
        pdf.text(text3, 20, 240);
        pdf.line(177, 240 + 2, pdf.getStringUnitWidth(text3) + textWidth3 - 20, 240 + 2)

        let text4 = "Datos Creados: [Fecha :" + createdAt.slice(0, -14) + '] | [Hora :' + createdAt.slice(11, -5) + ']'
        const textWidth4 = pdf.getTextWidth(text4);
        pdf.text(text4, 20, 260);
        pdf.line(160, 260 + 2, pdf.getStringUnitWidth(text4) + textWidth4 - 18, 260 + 2)

        let text5 = "Datos Modificados: [Fecha " + updatedAt.slice(0, -14) + '] | [Hora :' + updatedAt.slice(11, -5) + ']'
        const textWidth5 = pdf.getTextWidth(text5);
        pdf.text(text5, 20, 280);
        pdf.line(195, 280 + 2, pdf.getStringUnitWidth(text5) + textWidth5 - 20, 280 + 2)

        pdf.setFont('courier')
        pdf.setFontSize(20);
        

        var text6 = "Datos de tronadura",
        xOffset2 = (pdf.internal.pageSize.width / 2) - (pdf.getStringUnitWidth(text6) * pdf.internal.getFontSize() / 2); 
        pdf.text(text6, xOffset2, 320);

        pdf.setFontSize(15);
        
        pdf.line(15, 350, 580, 350)
        
        let datarow = 0

        let datadoc = [...DataCampos]
        let vertialArray = [...MapVer]

        var textdata = ""
        var columdata = ""
        var datadb = []
        for( var x = 0; x < datadoc.length; x++)
        {
            let sizeData = 1
            for( var y = 0; y < vertialArray.length; y++)
            {
                
                if(vertialArray[y][datarow].length > 0)
                {
                    if(y == 0)
                    {
                        textdata = textdata + vertialArray[y][datarow]
                    }
                    else
                    {
                        textdata = textdata +  ", " +vertialArray[y][datarow]
                    }
                    
                    if(textdata.length > (50 * sizeData))
                    {
                        textdata = textdata + '\n'
                        sizeData = sizeData + 1
                    }
                    
                    
                }   
            }
            columdata = datadoc[x]
            if (datadoc[x] in datadb)
            {
                if(columdata in datadb)
                {
                    if(columdata in datadb)
                    {
                        columdata = columdata + '-'
                    }
                    columdata = columdata + '-'
                }
                columdata = datadoc[x] + '-'
            }
            datadb.push({Campos:[columdata], Valores:textdata})
            textdata = ""
            columdata = ""
        }   
        
        console.log(datadb)
        let header = ["Campos","Valores"];
        let headerConfig = header.map(key=>({ 
        'name': key,
        'prompt': key,
        'width':10,
        'right':10,
        'padding':0}));

        pdf.table(10, 350,datadb, headerConfig,{padding:2, autoSize:true, });
        pdf.save("Tronadura" + Nombre_doc)
    }

    const SwitchDiv = () =>
    {
        setDateMode(!DateMode)
        
        if(DateMode)
        {
            setUpadeTable(false)
        }
        else
        {
            updateDoc()
        }

    }

    useEffect(() => {
    if(updateTable == false)
        {
            setUpadeTable(true)
            updateArray()
        }
    if(datapdf.length == 0)
        {
            updateDoc()
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
                        { pdfRender ? 
                        <>
                        <div>
                            <button onClick={()=>ExportarPDF()} className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-sm shadow-gray-600/50  rounded-xl w-40 p-2  font-bold md:text-xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-300 duration-300 mr-5 ">Exportar PDF</button>
                        </div>
                        <div>
                            <button onClick={()=>SwitchDiv()} className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-sm shadow-gray-600/50  rounded-xl w-40 p-2  font-bold md:text-xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-300 duration-300 mr-5 ">Modo Exel</button>     
                        </div>
                        </>
                        
                         : 
                         <>
                         <div>
                            <button onClick={()=>ExportarDatos()} className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-sm shadow-gray-600/50  rounded-xl w-40 p-2  font-bold md:text-xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-300 duration-300 mr-5 ">Exportar Exel</button>
                        </div>
                        <div>
                            <button onClick={()=>SwitchDiv()} className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-sm shadow-gray-600/50  rounded-xl w-40 p-2  font-bold md:text-xl text-lg text-white hover:cursor-pointer  hover:shadow-gray-200 hover:text-gray-300 duration-300 mr-5 ">Modo Doc</button>     
                        </div>
                         </>
                         }<br/>
                        </div>
                        <br/>
                        { pdfRender ? <div>
                            <table name="list_table" className='table-fixed'><thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr className="bg-slate-300 border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th className="border-2 border-gray-400 border-y-gray-500">Campos</th>
                                    <th>Valores</th>
                                </tr>
                            </thead>
                                <tbody>
                                {datapdf.map((dato1,indice1) =>{
                                    return <tr key={indice1} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th className='dark:bg-gray-800 dark:border-gray-700'>{dato1.Campos + ':'}</th>
                                        <th className='text-left border-l-4 border-indigo-200'>{dato1.Valores}</th>
                                    </tr>

                                })}

                                </tbody>
                            </table>
                            <br/>
                            <br/>
                            </div> 
                        : 
                        <>
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
                            <br/><br/> 
                        </>
                        
                        }
                        <div>
                            
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Modal