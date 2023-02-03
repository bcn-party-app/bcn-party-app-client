import { useState } from "react";
// import service from "../service/auth.service";
import axios from "axios";
import SelectClub from "../components/SelectClub"
// import SelectClub from "./components/select-club.jsx";
import { Input, Button } from "@material-tailwind/react";
 
const API_URL = "https://bcn-party.cyclic.app";
//const API_URL = process.env.REACT_APP_API_URL || "https://bcn-party.cyclic.app";
 
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
    axios.post(`${API_URL}/api/upload`, uploadData)
          .then(response => {
            // console.log("response is: ", response);
            // response carries "fileUrl" which we can use to update the state
            setImage(response.data.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('authToken');
    // Grab the state variable values
    // Add a new club
    const newParty = { name, club, date, musicGenre, image }
    // Add that club to the DB ==> send a POST request to 'https://bcn-party.cyclic.app/api/clubs'
    axios.post(`${API_URL}/api/party`, newParty, { headers: { Authorization: `Bearer ${storedToken}` } })
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

    <div className="addclub-form">  
            <form onSubmit={handleSubmit} className="pt-8 flex-auto">
                <div className="flex flex-col w-72 gap-6">
                     
                    <Input  label="Name"
                    type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    
                    <label>
                    <SelectClub club={club} setClub={setClub}/>
                    </label>
                    

                    <Input  label="Date"
                    type="date" name="date" value={date}  onChange={(e) => setDate(e.target.value)} />
                    
                    <Input  label="MusicGenre"
                    type="text" name="musicGenre" value={musicGenre}  onChange={(e) => setMusicGenre(e.target.value)} />
                    

                    <Input  label="Image"
                    type="file" onChange={(e) => handleFileUpload(e)} />

                    <Button className="w-72 rounded-lg px-4 py-2 bg-gradient-to-tr from-blue-200 to-blue-400 hover:text-white" 
                    type="submit"><b>Add Party</b></Button>
                    
                </div>

            </form>
            
        </div>



    /* <div className="AddParty">
      <h3>Add Party</h3>
 
      <form onSubmit={handleSubmit}>
        <label>name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
 
        <label>Club:
        <SelectClub club={club} setClub={setClub}/>
        </label>
        

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
    </div> */
  );
}
 
export default AddParty;