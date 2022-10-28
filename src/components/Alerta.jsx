
const Alerta = ({alerta}) =>{
    return(
        <>
            <div className={`${alerta.error ? 'from-red-400 to-red-600': 'from-gray-400 to-gray-600'} bg-gradient-to-br text-center p-3 rounded-lg text-white uppercase font-bold text-sm mb-6 m-5 `}> 
                {alerta.msg}
            </div>
            
        </>

    )

};

export default Alerta;