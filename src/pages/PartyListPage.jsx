import { useState, useEffect } from "react";
import axios from "axios";
import AddParty from "../components/AddParty";
import PartyCard from "../components/PartyCard";
 
const API_URL = "https://bcn-party.cyclic.app";
//const API_URL = process.env.REACT_APP_API_URL || "https://bcn-party.cyclic.app";
//  console.log(process.env.REACT_APP_API_URL)
 


function PartyListPage() {
  const [parties, setParties] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
 
  const getAllParties = () => {
    const storedToken = localStorage.getItem('authToken');
    
    axios
      .get(`${API_URL}/api/party`, { headers: { Authorization: `Bearer ${storedToken}`}})
      .then((response) => {
      console.log("Response from get/party", response.data);
        setParties(response.data); setIsLoading(false)} ) 
      .catch((error) => console.log(error));
  };
 
  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllParties();
  }, [] );
 
  if(isLoading) {
    return <p> loading </p>
  }
  return (
    <div className="PartyListPage">
       {parties &&
       <>
        <AddParty refreshParties={getAllParties} />
      <div className="partyCardsContainer">
        {parties.map((party) => {
        return <PartyCard key={party._id} {...party} getAllParties={getAllParties}/>})
        // <partyCard key={party._id} name={party.name} musicGenre={party.musicGenre} _id={party._id}/>)
        
        }     
       </div>
       </>
    
  }
  </div>
    
  );
}
 
export default PartyListPage;