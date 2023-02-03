import { useState, useEffect } from "react";
import axios from "axios";
import { Input, Select, Option } from "@material-tailwind/react";

const API_URL = "https://bcn-party.cyclic.app";
//const API_URL = process.env.REACT_APP_API_URL || "https://bcn-party.cyclic.app";

function SelectClub(props) {
  const [clubs, setClubs] = useState([]);
 
  const getAllClubs = () => {
    const storedToken = localStorage.getItem('authToken');
    
    axios
      .get(`${API_URL}/api/club`, { headers: { Authorization: `Bearer ${storedToken}`}})
      .then((response) => setClubs(response.data))
      .catch((error) => console.log(error));
  };
 
  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllClubs();
  }, [] );


    return (
      <div className="flex flex-col w-72 gap-6">
      
      <select label="Club" className="" value={props.club} onChange={(e)=>props.setClub(e.target.value)}>
      {clubs.map(club => (
        <option className="" key={club._id} value={club._id}>
          {club.name}
        </option>
      ))}
    </select>
</div>
    );
  }

  export default SelectClub;
