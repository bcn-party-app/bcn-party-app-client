import { useState, useEffect } from "react";
import axios from "axios";
import AddParty from "../components/AddParty";
import PartyCard from "../components/PartyCard";
 
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
//  console.log(process.env.REACT_APP_API_URL)
 
function PartyListPage() {
  const [parties, setParties] = useState([]);
 
  const getAllParties = () => {
    const storedToken = localStorage.getItem('authToken');
    
    axios
      .get(`${API_URL}/api/party`, { headers: { Authorization: `Bearer ${storedToken}`}})
      .then((response) => setParties(response.data))
      .catch((error) => console.log(error));
  };
 
  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllParties();
  }, [] );
 
  
  return (
    <div className="PartyListPage">

        <AddParty refreshParties={getAllParties} />
      
        {parties.map((party) => 
        // <partyCard key={party._id} name={party.name} musicGenre={party.musicGenre} _id={party._id}/>)
        <PartyCard key ={party._id} {...party} />)
        }     
       
    </div>
  );
}
 
export default PartyListPage;