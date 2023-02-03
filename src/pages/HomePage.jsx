import { Link } from "react-router-dom"
import { useContext } from "react";
import { Button } from "@material-tailwind/react";
import homePageImg from '../assets/app.findbcn.png';

import { AuthContext } from "../context/auth.context";

const HomePage = props => {
    
    const { isLoggedIn } = useContext(AuthContext);
    
      
  return (
<div className="home-page">
    <div className="flex-auto text-center">
        {isLoggedIn && 
            <div className="mt-40 home-page" >
                {/* <h1 className="text-9xl font-bold font-link text-white">.find</h1> */}
                <img className="home-page-img rounded-3xl" src={homePageImg} alt={"home-page"}/>
                <p className="mt-3 text-base font-link font-bold  tracking-[.20em] text-gray-600 slogan">
                The best clubs and parties in Barcelona</p>
            </div>}
          
        {!isLoggedIn && 
            <div className="mt-40 home-page  mx:auto">
                {/* <h1 className="text-9xl font-bold font-link text-white">.find</h1> */}
                <Link to={'/login'}><img className="home-page-img rounded-2xl" src={homePageImg} alt={"home-page"}/></Link>
                <p className="mt-3 text-base font-link font-bold   text-gray-600 slogan">
                The best clubs and parties in Barcelona</p>
                <div className="">
                    <Link to={'/signup'}><Button className="mt-10 w-72 rounded-lg px-4 py-2 bg-gradient-to-tr from-blue-200 to-blue-400">
                    GET STARTED!</Button></Link>


                </div>
            </div>}
    </div>
</div>
  )
}

export default HomePage