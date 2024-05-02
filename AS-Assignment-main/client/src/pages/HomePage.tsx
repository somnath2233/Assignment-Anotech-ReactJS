import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import TaskForm from "../components/TaskForm";
import TaskCards from "../components/TaskCards";
import axiosInstance from "../api/api";

function HomePage(){
    const [form,setForm]=React.useState(false);
    const [redirect,setRedicrect]=useState(false);
    const token:string=localStorage.getItem("id")||""
    useEffect(()=>{
        if(token===""){
             setRedicrect(true);
             return;
            }
        const data=new URLSearchParams({
            id:token
        })
        axiosInstance.post("api/auth/token", data)
        .then(res=>console.log(res))
        .catch((err)=>{
            console.log(err);
            setRedicrect(true)
        })
    })
    const handleLogout=()=>{
        localStorage.removeItem("id");
        setRedicrect(true);
    }
    return(
        <>
            {redirect && <Navigate to="/login" replace={true} />}
            <NavBar handleLogout={handleLogout} setForm={setForm}/>
            {form?<TaskForm setForm={setForm}/>:<TaskCards />}
        </>    
    );
}

export default HomePage;