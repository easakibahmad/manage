import { Outlet } from "react-router"
import NavbarHome from "../components/shared/NavbarHome"

const HomeLayout = () => {
  return (
    <div className="w-full relative overflow-hidden">
      <NavbarHome />
      <div className="my-10 h-full">
        <Outlet />    
      </div>
    </div>
  )
}

export default HomeLayout