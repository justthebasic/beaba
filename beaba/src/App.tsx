import { Navigate, Outlet } from "react-router-dom"
// import { useBearStore } from "./state/state"



function App() {

  // const isUserValid = useBearStore((state) => state.isUserValid)

  return (
    <>
    <div>
       <Outlet/> 
      
    </div>
    </>
  )
}

export default App
