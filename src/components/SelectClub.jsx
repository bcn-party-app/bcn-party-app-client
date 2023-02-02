import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";
//const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

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
      <div className="px-8 py-3">
      <label className="pr-2">Club:</label>
      <select className="rounded-md px-8 py-2 " value={props.club} onChange={(e)=>props.setClub(e.target.value)}>
      {clubs.map(club => (
        <option key={club._id} value={club._id}>
          {club.name}
        </option>
      ))}
    </select>
</div>
    );
  }

  export default SelectClub;
