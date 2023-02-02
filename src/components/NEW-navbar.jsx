<nav
  className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light">

  <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
    <button
      className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent1"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation">
    
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="bars"
        className="w-6"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512">
      
        <path
          fill="currentColor"
          d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
        </path>
      </svg>
    </button>
    <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent1">
      <Link className="text-xl text-white pr-2 font-semibold" to="/">Home</Link>

      {!isLoggedIn && (
        <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
        <li className="nav-item p-2">
          <Link
            className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
            to="/signup"
            >Sign Up</Link>
        </li>
        <li className="nav-item p-2">
          <Link
            className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
            to="/login"
            >Login</Link>
          
        </li>
      </ul>


        )}
      

      {isLoggedIn && (
        <>
      <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
        <li className="nav-item p-2">
          <Link className="nav-link text-white" to="/party">Parties</Link>
        </li>
        <li className="nav-item p-2">
          <Link
            className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
            to="/club"
            >Clubs</Link>
        </li>
        <li className="nav-item p-2">
          <Link
            className="nav-link text-white opacity-60 hover:opacity-80 focus:opacity-80 p-0"
            to="/profile"
            >Profile</Link>
        </li>
      </ul>
      

      {user && <span>Welcome back {user.name}</span>}

     <div className="dropdown relative">
      
        <Link
          className="dropdown-toggle flex items-center hidden-arrow"
          to="#"
          id="dropdownMenuButton2"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false">
        
          <img className="rounded-full w-25 h-25" 
            src={user.image} alt={"profile_image"} 
            loading="lazy"
          />
        </Link>
        <ul
          className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
          aria-labelledby="dropdownMenuButton2">
        
        <li>
            <Link
              className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
              to="/profile"
              >Profile</Link>
            
          </li>
          <li>
            <Link
              className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
              to="/"
              onClick={logOutUser}>Logout</Link>
          </li>
        </ul>
      </div>
      </>
      )}
      
    </div>  
  </div>
</nav>




//original

import { Link } from "react-router-dom";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context"; 
 
function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="pl-8 pr-8 relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-black shadow-lg navbar navbar-expand-lg navbar-light">
    {user && <span className="text-sky-200">Welcome back {user.name}</span>}
      <Link to="/">
        <button className="hover:bg-blue-200">Home</button>
      </Link>
 
      {/*    UPDATE     */}
      {isLoggedIn && (
        <>
          <Link to="/party"> <button className="hover:bg-blue-200">Parties</button>  </Link> 
          <Link to="/club"> <button className="hover:bg-blue-200">Clubs</button> </Link>
          <Link to="/profile"> <button className="hover:bg-blue-200">Profile</button> </Link>       
          <button className="hover:bg-blue-200" onClick={logOutUser}>Logout</button>
        </>
      )}
 
      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
          
        </>
      )}
    </nav> 
  );
}
 
export default Navbar;