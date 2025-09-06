import { useState,useEffect } from "react";


import api from "../../Api";

import "./dashboard.css";

const Dashboard=()=>{
    const [usermail,setUserMail]=useState("");
   

   

    useEffect(()=>{
        const fetchingUser=async()=>{
            const response=await api.get("/dashboard",{withCredentials:true});

            if(response.status==200){
                console.log("responsed:",response);
                setUserMail(response.data.message);
            }
        }
        fetchingUser();

        },[]
    
    )

   const logout=async()=>{
    await api.post("/logout",{},{withCredentials:true});
    localStorage.removeItem("isAuthenticated");
    window.location.href="/login-signup";
   }

    return(

        <div className="dashboard">
            {usermail?usermail:"user"}
            <br/>
            <br/>
            <button className="logout" onClick={logout} type="button">Logout</button>
        </div>
    )
}

export default Dashboard;