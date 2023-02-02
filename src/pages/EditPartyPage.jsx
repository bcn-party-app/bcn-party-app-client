import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";
//const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
 
function EditPartyPage(props) {
  const [name, setName] = useState("");
  const [club, setClub] = useState("");
  const [date, setDate] = useState("");
  const [musicGenre, setMusicGenre] = useState("");
  const [image, setImage] = useState("");


  // ******** this method handles the file upload ********
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
 
    const uploadData = new FormData();
 
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("image", e.target.files[0]);
 

    axios.post(`${API_URL}/api/upload`, uploadData)
          .then(response => {
            // console.log("response is: ", response);
            // response carries "fileUrl" which we can use to update the state
            setImage(response.data.image);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

  const { partyId } = useParams();            // <== ADD
  
  const navigate = useNavigate()
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('authToken');
    //update the party
    const updatedParty = {name, club, date, musicGenre, image}
    axios.put(`${API_URL}/api/party/${partyId}`, updatedParty, { headers: { Authorization: `Bearer ${storedToken}` } })
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
      .delete(`${API_URL}/api/party/${partyId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
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
       .get(`${API_URL}/api/party/${partyId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
       .then((response) => {
         /* 
           We update the state with the party data coming from the response.
           This way we set inputs to show the actual name and description of the party
         */
         const oneParty = response.data;
         setName(oneParty.name);
         setClub(oneParty.club);
         setDate(oneParty.date);
         setMusicGenre(oneParty.musicGenre);
         setImage(oneParty.image);
       })
       .catch((error) => console.log(error));
     
   }, [partyId]);
  
  return (
    <div className="EditPartyPage">
      <h3>Edit the party</h3>
 
      <form onSubmit={handleSubmit}>
        <label>name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
 
        <label>Club:</label>
        <select name="selectedClub" defaultValue="Selecionar">
          <option value="apple">Apolo</option>
          
          
        </select>
        



        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Music Genre:</label>
        <input
          type="text"
          name="musicGenre"
          value={musicGenre}
          onChange={(e) => setDate(e.target.value)}
        />

        <input type="file" onChange={(e) => handleFileUpload(e)} />
 
        <input type="submit" value="Submit" />
      </form>

      <button onClick={deleteParty}>Delete party</button>
    </div>
  );
}
 
export default EditPartyPage;