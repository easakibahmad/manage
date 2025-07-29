import { Outlet } from "react-router"

import MainNav from "@/components/common/MainNav"

const Main = () => {
  return (
    <div className="w-full relative overflow-hidden">
      <MainNav />
      <div className="my-10 h-full">
        <Outlet />    
      </div>
    </div>
  )
}

export default Main