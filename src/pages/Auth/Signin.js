import React, { useState } from 'react';
import Logo from '../../../src/images/logo.png'
import '../Auth/Signin.css'
import Navbar from '../../Components/Navbar/Navbar'
import { Link } from 'react-router-dom';
import axios from "axios";
import {useAuth} from "../../context/auth"
import { useNavigate,useLocation } from "react-router-dom";


export default function Signin() {
   // const [employeeId, setEmployeeId] = useState('');
    const [username,setUsername]= useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [auth,setAuth]=useAuth();
    const location =useLocation()
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://10.0.0.200:75/api/auth/login", {
            userid: username,
            password
            
          });
          if (res && res.data.success) {
          //  toast.success(res.data && res.data.message);
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,
             });
             localStorage.setItem('auth',JSON.stringify(res.data))
            navigate(location.state||"/");
          } else {
            console.log(res.data.message)
          }
        } catch (error) {
          console.log(error);
          //toast.error("Something went wrong");
        }
      };


    const handleClearEmployeeId = () => {
      setUsername('');
    };
  
    const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
        <div class='container'>
       
            <div class='TopSec'>
                <h1>Portal For Cost Savings Plan</h1>
                <div class='logo'>
                    <img src={Logo} />
                </div>
            </div>

                {/* Form Section
    *********** of Signing
    *********** in here */}
            <form class='Signin' onSubmit={handleSubmit}>
                <h1>Login</h1> 
                <div class='inputsArea'>
                    <div>
                        <input 
            placeholder='Employee ID' 
            value={username}
              onChange={(e) => 
              setUsername(e.target.value)} />  
              <i class="fa fa-times" aria-hidden="true" 
               onClick={handleClearEmployeeId}></i>  
                    </div>
                    <br/>
                    <div>
                    <input
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
              aria-hidden='true'
              onClick={handleTogglePasswordVisibility}
            ></i> 
                    </div>
                </div>
             
                <div class='right'>
                    <Link to="/"><a>Forgot Password?</a></Link>
                </div> <br />
               <button type="submit">Login</button>
                <br />
                <Link to="/"><a>Get Login Help</a></Link>    
            </form>

                {/* Form Section
    *********** of Signing
    *********** in here */}

        </div>
    )
}
