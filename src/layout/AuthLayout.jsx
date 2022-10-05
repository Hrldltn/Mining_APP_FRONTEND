import {Outlet} from 'react-router-dom'

const AuthLayout = () => {
  return (
    <>
      <main className="mx-auto md:grid md:grid-cols-2 md:align-end md:h-screen gap-12">
        <Outlet/>
      </main>
    </>
  )
}

export default AuthLayout