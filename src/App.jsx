import { useState } from "react"
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { useEffect } from "react";
import { login, logout } from "./features/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import './App.css'

function App() {
const [loading,setloading]=useState(true);

const dispatch= useDispatch()

useEffect(()=>{
  authService.UserCurrentStatus()
  .then((userData)=>{
    if(userData)
      {
         dispatch(login({userData}))
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
       <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>
):null
}

export default App
