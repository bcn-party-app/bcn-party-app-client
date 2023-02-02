import { Link } from "react-router-dom"
import { useContext } from "react";

import { AuthContext } from "../context/auth.context";

const HomePage = props => {
    
    const { isLoggedIn } = useContext(AuthContext);
    
      
  return (
<div className="home-page">
    <div className="flex-auto text-center">
        {isLoggedIn && 
            <div className="mt-40 home-page" >
                <h1 className="text-7xl">PARTY APP</h1>
                <p className="mt-10 text-base">Find the best party in Barcelona</p>
            </div>}
          
        {!isLoggedIn && 
            <div className="mt-40 home-page">
                <h1 className="text-7xl">PARTY APP</h1>
                <p className="mt-10 text-base">Find the best party in Barcelona</p>
                <div className="">
                    <Link to={'/signup'}><button className="mt-10 w-72 rounded-lg px-4 py-2 bg-gradient-to-tr from-blue-600 to-blue-400 hover:text-white">
                    GET STARTED!</button></Link>
                </div>
            </div>}
    </div>
</div>
  )
}

export default HomePage