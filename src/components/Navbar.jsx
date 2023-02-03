import { Link } from "react-router-dom";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context"; 
// import homePageImg from '../assets/app.find.png'; 
import { useState, useEffect } from "react";
import { Navbar, MobileNav, Typography, Button, IconButton} from "@material-tailwind/react";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const [openNav, setOpenNav] = useState(false);
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 768 && setOpenNav(false)
    );
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    {isLoggedIn && (
      <>
      
    {user && <Typography className="font-link font-bold hover:text-blue-700 flex items-center">Welcome back {user.name}</Typography>}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/profile" className="font-link font-bold hover:text-blue-700 flex items-center">
          Profile
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/party" className="font-link font-bold hover:text-blue-700 flex items-center">
          Parties
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/club" className="font-link font-bold hover:text-blue-700 flex items-center">
          Clubs
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/" onClick={logOutUser} className="font-link font-bold hover:text-blue-700 flex items-center">
          Logout
        </Link>
      </Typography>
      
      </>
      )}
      {!isLoggedIn && (
        <>
        <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/signup" className="font-link font-bold hover:text-blue-700 flex items-center">
          Sign Up
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/login" className="font-link font-bold hover:text-blue-700 flex items-center">
          Login
        </Link>
      </Typography>
      </>
      )}
    </ul>
  );

  return (
    
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
    
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <span></span>
          {/* <img className="h-5 mx-auto rounded-md" src={homePageImg} alt={"home-page"}/> */}
        </Typography>
        
        <div className="hidden lg:block">{navList}</div>
        <Link to="/" >
        <Button variant="gradient" size="sm" className="hidden lg:inline-block ">
          <span>Home</span>
        </Button>
        </Link>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent  lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}>
        
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
            
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"/>
              
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}>
            
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"/>
              
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Link to="/" >
          <Button  variant="gradient" size="sm" fullWidth className="from-blue-200 to-blue-400 mb-2">
            <span>Home</span>
          </Button>
          </Link>
        </div>
      </MobileNav>
    </Navbar>
  );
}
 
export default NavBar;