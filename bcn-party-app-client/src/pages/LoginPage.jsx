import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { AuthContext } from "../context/auth.context";
import authMethods from "../service/auth.service";

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
                authenticateUser()
                navigate("/profile")
            } )
            .catch(err => console.error(err))
    }
  return (
<div className="loginContainer">
    <div className="ovalBackground">
        <div style={{ width: 'inherit'}}>   
            <form onSubmit={handleSubmit} className="loginForm">
                <div>
                    <h1>Login</h1> 
                    <label>Email</label>
                    <br />
                    <input type="text" name="email" value={user.email} onChange={handleChange} />
                    <br />
                    <label>Password</label>
                    <br />
                    <input type="password" name="password" value={user.password}  onChange={handleChange} />
                    <br />
                    
                </div>

                <div className="loginRightSection">
                <button type="submit"><b>Login</b></button>
                </div>    
            </form>
            <p>Don't have an account yet? you can create your account <Link to={'/signup'}>here</Link> </p>
        </div>
    </div>
</div>
  )
}

export default LoginPage