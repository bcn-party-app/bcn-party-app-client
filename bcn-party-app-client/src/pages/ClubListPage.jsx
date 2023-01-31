import { useState, useEffect } from "react";
import axios from "axios";
import AddClub from "../components/AddClub";
import ClubCard from "../components/ClubCard";
 
// const API_URL = "http://localhost:5005";
//  console.log(process.env.REACT_APP_API_URL)
 
function ClubListPage() {
  const [clubs, setClubs] = useState([]);
 
  const getAllClubs = () => {
    const storedToken = localStorage.getItem('authToken');
    
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/club`, { headers: { Authorization: `Bearer ${storedToken}`}})
      .then((response) => setClubs(response.data))
      .catch((error) => console.log(error));
  };
 
  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllClubs();
  }, [] );
 
  
  return (
    <div className="clubListPage">

        <AddClub refreshClubs={getAllClubs} />
      
        {clubs.map((club) => 
        // <ClubCard key={club._id} name={club.name} musicGenre={club.musicGenre} _id={club._id}/>)
        <ClubCard key ={club._id} {...club} />)
        }     
       
    </div>
  );
}
 
export default ClubListPage;