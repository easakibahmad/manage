import { Outlet } from "react-router"
import NavbarHome from "../components/shared/NavbarHome"

const HomeLayout = () => {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <NavbarHome />
      <Outlet />  
    </div>
  )
}

export default HomeLayout