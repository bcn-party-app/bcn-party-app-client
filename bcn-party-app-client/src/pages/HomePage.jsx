import { Link } from "react-router-dom"
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const HomePage = props => {
    
    const { user, setUser, isLoggedIn, logOutUser } = useContext(AuthContext);
    
      
  return (
<div className="homePageContainer">
    <div className="ovalBackground">
        {isLoggedIn && <div >
                <h1>PARTY APP</h1>
                <p>Find the best party in Barcelona</p>
                
            </div>}
          
        {!isLoggedIn && <div>
                <h1>PARTY APP</h1>
                <p>Find the best party in Barcelona</p>
                <div className="signinContainer">
                    <Link to={'/signup'}><button>Get started!</button></Link>
                    
                </div>
            </div>}

        
    </div>
</div>
  )
}

export default HomePage