import { useState } from "react"
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { useEffect } from "react";
import { login, logout } from "./features/authSlice";
import { Footer, Header } from "./components";


function App() {
const [loading,setloading]=useState(true);

const dispatch= useDispatch()

useEffect(()=>{
  authService.UserCurrentStatus()
  .then((userdata)=>{
    if(userdata)
      {
         dispatch(login({userdata}))
      }
    
    else
    {
      dispatch(logout())
    }
   
  })
  .catch((error)=>{
    console.log("APP::error::",error);
  })
  .finally(()=>setloading(false))
},[])
  

return !loading?(
  <div className="min-h-screen flex flex-wrap content-between bg-slate-500">
    <div className="w-full block">
      <Header/>
      <main>
        hello
      </main>
      <Footer/>
    </div>
  </div>
):null
}

export default App
