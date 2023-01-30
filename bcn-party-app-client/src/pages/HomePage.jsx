import { Link } from "react-router-dom"
import { useContext } from "react";

import { AuthContext } from "../context/auth.context";

const HomePage = props => {
    
    const { isLoggedIn } = useContext(AuthContext);
    
      
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