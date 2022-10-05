
const Alerta = ({alerta}) =>{
    return(
        <>
            <div className={`${alerta.error ? 'from-red-400 to-red-600': 'from-amber-400 to-amber-600'} bg-gradient-to-br text-center p-3 rounded-lg text-white uppercase font-bold text-sm mb-10 m-5 `}> 
                {alerta.msg}
            </div>
            
        </>

    )

};

export default Alerta;