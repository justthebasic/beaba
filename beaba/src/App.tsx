import { Navigate, Outlet } from "react-router-dom"
import { useUserStore } from "./state/state"



function App() {

  const isUserValid = useUserStore((state) => state.isUserValid)

  return (
    <>
    <div>
      {isUserValid ? <Outlet/> : <Navigate to='/Login'/>}
       
      
    </div>
    </>
  )
}

export default App
