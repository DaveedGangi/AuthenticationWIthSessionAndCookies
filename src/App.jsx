import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import './App.css'
import SignUpLogin from "./components/SignUpAndLogin/signup-login";
import Dashboard from "./components/Dashboard/dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  

  return (
    <>
    <Router>
    <Routes>
       <Route path="/" element={<Navigate to="/login-signup" replace />} />
      <Route path="/login-signup" element={<SignUpLogin/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      
      </Routes>
    </Router>
      
      </>  )
}

export default App
