import {Link} from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav className="flex">
      <Link to="/admin/Perfil"
        className="font-bold uppercase text-gray-600 mr-10">
        Perfil
      </Link>
      <Link to="/admin/Modificar-Password"
        className="font-bold uppercase text-gray-600">
        Modificar Password
      </Link>
    </nav>
  )
}

export default AdminNav
