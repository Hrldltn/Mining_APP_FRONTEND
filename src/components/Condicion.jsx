import ImagenRegistro from '../assets/img/Registro.jpg'

const Condicion = ({condicion}) => {
  const {nombre, modelo, cantidad, estado, fecha, galla, usuario, _id } = condicion

  var sectionStyle={
    width: '100%',
    backgroundImage:`url(${ImagenRegistro})`,
    alt:"Registrar"
  }
  return (
    <div className="flex"><br></br><br></br>
      <div>
        <p>Nombre:
            <span className="font-normal normal-case">{nombre}</span>
        </p>
        <p>modelo:
            <span className="font-normal normal-case">{modelo}</span>
        </p><br></br>
        <p>cantidad:
            <span className="font-normal normal-case">{cantidad}</span>
        </p><br></br>
        <p>estado:
            <span className="font-normal normal-case">{estado}</span>
        </p><br></br>
        <p>fecha:
            <span className="font-normal normal-case">{fecha}</span>
        </p><br></br>
        <p>galla:
            <span className="font-normal normal-case">{galla}</span>
        </p><br></br>
        <p>usuario:
            <span className="font-normal normal-case">{usuario}</span>
        </p><br></br>
        <p>_id:
            <span className="font-normal normal-case">{_id}</span>
        </p>
      </div>
      <div className="w-1/2 h-1/2" style={sectionStyle}>
        
      </div><br></br><br></br>
    </div>
  )
}

export default Condicion
