import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { AuthContext } from "../context/auth.context";
import authMethods from "../service/auth.service";
import { Input } from "@material-tailwind/react";

const LoginPage = () => {
    const [user, setUser] = useState({email: '', password: ''});
    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(user => ({...user, [name]: value}))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

       authMethods.logIn(user)
            .then((tokenObject) =>{
                // store the token in localStorage
                storeToken(tokenObject.authToken)

                return authenticateUser()
                
            } )
            .then(() => navigate("/profile"))
            .catch(err => console.error(err))
    }
  return (

   
        <div className="login-form">   
            <form onSubmit={handleSubmit} className="pt-20 flex-auto">
                <div className="flex flex-col w-72 gap-6">
                     
                    <Input variant="Email" label="Email"
                    type="text" name="email" value={user.email} onChange={handleChange} />
                    
                    
                    <Input variant="Password" label="Password"
                    type="password" name="password" value={user.password}  onChange={handleChange} />
                    <br />

                    <button className="w-72 rounded-lg px-4 py-2 bg-gradient-to-tr from-blue-600 to-blue-400 hover:text-white" 
                    type="submit"><b>Login</b></button>
                    
                </div>

            </form>
            <p className="w-72 text-center pt-5" >Don't have an account yet? <br/> You can create your account <br/> <Link className="text-blue-400" to={'/signup'}>here</Link> </p>
        </div>
    

  )
}

export default LoginPage