import { Navigate, Outlet } from "react-router-dom"
import { useBearStore } from "./state/state"



function App() {

  const isUserValid = useBearStore((state) => state.isUserValid)

  return (
    <>
    <div>
      {isUserValid ? <Outlet/> : <Navigate to='/Login'/>}
       
      
    </div>
    </>
  )
}

export default App
