import { useState } from "react";
// import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import authMethods from "../service/auth.service"
import { Input, Button } from "@material-tailwind/react";

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

    <div className="login-form">   
            <form onSubmit={handleSubmit} className="pt-20 flex-auto">
                <div className="flex flex-col w-72 gap-6">
                     
                    <Input label="Name"
                    type="text" name="name" value={user.name} onChange={handleChange} />
                    
                    <Input label="Email"
                    type="text" name="email" value={user.email} onChange={handleChange} />
                    
                    
                    <Input label="Password"
                    type="password" name="password" value={user.password}  onChange={handleChange} />
                    <br />

                    <Button className="w-72 rounded-lg px-4 py-2 bg-gradient-to-tr from-blue-200 to-blue-400 " 
                    type="submit"><b>Sign Up</b></Button>
                    
                </div>

            </form>
            <p className="w-72 text-center pt-5" >Already have an account? <br/> <Link className="text-blue-400" to={'/login'}>Login!</Link> </p>
        </div>


   
  )
}

export default SignUpPage;