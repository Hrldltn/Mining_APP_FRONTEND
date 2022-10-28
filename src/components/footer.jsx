import logo from '../assets/img/logo.png'

const footer = () => {

  var sectionStyle={
    width: '53%',
    heigth:'100%',
    backgroundImage:`url(${logo})`,
    alt:"Registrar"
  }
  return (
    
      <footer>
          <div className=" w-full mr-20 md:mr-0">
            <div className="md:translate-x-36 xl:translate-x-96  2xl:translate-x-[44rem] h-52 bg-no-repeat hidden md:block" style={sectionStyle}></div>  
          </div>     
      </footer>
    )
}

export default footer
