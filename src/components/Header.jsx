import{ Link } from 'react-router-dom'
const Header = () => {
  return (
      <header className="py-10 bg-gray-200 rounded-xl drop-shadow-xl">
        <div className="container mx-auto">
        <Link to='/admin'><h1 className="text-center text-xl md:text-4xl font-bold text-black">Global {''} <span className="text-amber-600">Cooper</span> Mining</h1></Link>
        </div>
      </header>
   
  )
}

export default Header