import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
 
function EditPartyPage(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { partyId } = useParams();            // <== ADD
  
  const navigate = useNavigate()
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('authToken');
    //update the party
    const updatedParty = {name, description}
    axios.put(`${process.env.REACT_APP_API_URL}/api/party/${partyId}`, updatedParty, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(() => navigate(`/party/${partyId}`))
        .catch(err => console.log(err))
    // redirect the user to the party's page
  }
  // This effect will run after the initial render and each time
  // the partyId coming from the URL parameter `partyId` changes
   

  const deleteParty = () => {                    //  <== ADD
    // Make a DELETE request to delete the party
    const storedToken = localStorage.getItem('authToken');
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/party/${partyId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(() => {
        // Once the delete request is resolved successfully
        // navigate back to the list of partys.
        navigate("/party");
      })
      .catch((err) => console.log(err));
  };  

   useEffect(() => {  
    const storedToken = localStorage.getItem('authToken');                                // <== ADD
     axios
       .get(`${process.env.REACT_APP_API_URL}/api/party/${partyId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
       .then((response) => {
         /* 
           We update the state with the party data coming from the response.
           This way we set inputs to show the actual name and description of the party
         */
         const oneParty = response.data;
         setName(oneParty.name);
         setDescription(oneParty.description);
       })
       .catch((error) => console.log(error));
     
   }, [partyId]);
  
  return (
    <div className="EditPartyPage">
      <h3>Edit the party</h3>
 
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <label>Club:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
 
        <input type="submit" value="Submit" />
      </form>

      <button onClick={deleteParty}>Delete party</button>
    </div>
  );
}
 
export default EditPartyPage;