import { useState } from "react";
// import service from "../service/auth.service";
import axios from "axios";
 
// const API_URL = "http://localhost:5005";
 
function AddParty(props) {
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
 
//     service
//       .uploadImage(uploadData)
//       .then(response => {
//         // console.log("response is: ", response);
//         // response carries "fileUrl" which we can use to update the state
//         setImage(response.fileUrl);
//       })
//       .catch(err => console.log("Error while uploading the file: ", err));
//   };
    axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
          .then(response => {
            // console.log("response is: ", response);
            // response carries "fileUrl" which we can use to update the state
            setImage(response.data.image);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('authToken');
    // Grab the state variable values
    // Add a new club
    const newParty = { name, club, date, musicGenre, image }
    // Add that club to the DB ==> send a POST request to 'http://localhost:5005/api/clubs'
    axios.post(`${process.env.REACT_APP_API_URL}/api/party`, newParty, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
        // Reset the state
        setName("");
        setClub("");
        setDate("")
        setMusicGenre("")
        setImage("")

        props.refreshParties();
      })
      .catch((error) => console.log(error));
  }
 
  return (
    <div className="AddParty">
      <h3>Add Party</h3>
 
      <form onSubmit={handleSubmit}>
        <label>name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
 
        <label>Club:</label>
        <input 
          type="text"
          name="club"
          value={club.name}
          onChange={(e) => setClub(e.target.value)}
        />

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
          onChange={(e) => setMusicGenre(e.target.value)}
        />

        <input type="file" onChange={(e) => handleFileUpload(e)} />
 
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
 
export default AddParty;