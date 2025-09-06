import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api";
import "./index.css";

const SignUpLogin=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const [showSignUp,setShowSignUp]=useState(false);
    const [error,setError]=useState("");

    const navigate=useNavigate();


  // Check if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/me");
        if (res.status === 200) {
          navigate("/dashboard", { replace: true }); 
        }
      } catch {
        // not logged in → stay on login
      }
    };
    checkAuth();
  }, [navigate]);

    const submitform=async(e)=>{
        e.preventDefault();
        setError("");

        try{
            if(showSignUp){
                // signup Request
                const registered= await api.post("/register",{email,password});
                if(registered.status==200){
                 alert("User registered successfully. Please login.");
                 setShowSignUp(false);
                }
            }
            else{
                const res=await api.post("/login",{email,password},{withCredentials:true});
                if(res.status==200){
                localStorage.setItem("isAuthenticated","true");

                alert("Login Successfull!");
                console.log(res.data);
                navigate("/dashboard");
                }


                
            }
        }
        catch(err){
            setError(err.response?.data?.message || "Something went wrong");
        }

       


    }


    return(
        <div className="auth-container">
           

            <form onSubmit={submitform}>
              <h2>{showSignUp?"SignUp":"Login"}</h2>
            <label name="email">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" type="email" required/>
            <label name="password">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password"  type="password" required/>
            
            <button className="submit" type="submit">{showSignUp?"Sign Up":"Login"}</button>
           

            {
                error&&<p>{error}</p>
            }


            <p>
                {showSignUp?"Allready have an account?":"Don't have an account"}
                <button className="shownupButton" onClick={()=>setShowSignUp(!showSignUp)} type="button">{showSignUp?"Login":"Register"}</button>
            </p>

            </form>
          
           


        </div>
    )
}

export default SignUpLogin;