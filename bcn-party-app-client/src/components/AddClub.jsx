import { useState } from "react";
// import service from "../service/auth.service";
import axios from "axios";
 
// const API_URL = "http://localhost:5005";
 
function AddClub(props) {
  const [name, setName] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
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
    const newClub = { name, streetName, streetNumber, image }
    // Add that club to the DB ==> send a POST request to 'http://localhost:5005/api/clubs'
    axios.post(`${process.env.REACT_APP_API_URL}/api/club`, newClub, { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((response) => {
        // Reset the state
        setName("");
        setStreetName("");
        setStreetNumber("")
        setImage("")

        props.refreshClubs();
      })
      .catch((error) => console.log(error));
  }
 
  return (
    <div className="AddClub">
      <h3>Add club</h3>
 
      <form onSubmit={handleSubmit}>
        <label>name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
 
        <label>street Name:</label>
        <input
          type="text"
          name="streetName"
          value={streetName}
          onChange={(e) => setStreetName(e.target.value)}
        />

        <label>street Number:</label>
        <input
          type="number"
          name="streetNumber"
          value={streetNumber}
          onChange={(e) => setStreetNumber(e.target.value)}
        />

        <input type="file" onChange={(e) => handleFileUpload(e)} />
 
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
 
export default AddClub;