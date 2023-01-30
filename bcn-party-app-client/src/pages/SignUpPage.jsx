import { useState } from "react";
// import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import authMethods from "../service/auth.service"

const SignUpPage = () => {
    const [user, setUser] = useState({name: '', email: '', password: ''});
    const navigate = useNavigate()

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser(user => ({...user, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        ///
        authMethods.signUp(user)
            .then(() => navigate('/login'))
            .catch(err => console.error(err))
        
    }
  return (
    <div className="signUpContainer">
        <div className="ovalBackground">
            <div style={{ width: 'inherit'}}>   
                <form onSubmit={handleSubmit} className="signUpForm">
                    <div>
                        <h1>Sign up</h1> 
                        <label>Name</label>
                        <br />
                        <input type="text" name="name" value={user.name} onChange={handleChange} />
                        <br />
                        <label>Email</label>
                        <br />
                        <input type="text" name="email" value={user.email}  onChange={handleChange} />
                        <br />
                        <label>Password</label>
                        <br />
                        <input type="password" name="password" value={user.password}  onChange={handleChange} />

                        <div className="signUpRightSection">
                             <button type="submit"><b>Create account</b></button>
                          </div>
                    </div>
                </form>
                <div className="x">
                          <p>Already have an account?</p>
                          <Link to={"/login"}> Login</Link>
                        </div> 
                    
            </div>
        </div>
    </div>
  )
}

export default SignUpPage;