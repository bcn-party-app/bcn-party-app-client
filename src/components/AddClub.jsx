import { useState } from "react";
// import service from "../service/auth.service";
import axios from "axios";
import { Input, Button } from "@material-tailwind/react";
 
const API_URL = "https://bcn-party.cyclic.app";
//const API_URL = process.env.REACT_APP_API_URL || "https://bcn-party.cyclic.app";
 
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
    const newClub = { name, streetName, streetNumber, image }
    // Add that club to the DB ==> send a POST request to 'https://bcn-party.cyclic.app/api/clubs'
    axios.post(`${API_URL}/api/club`, newClub, { headers: { Authorization: `Bearer ${storedToken}` } })
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
    <div className="addclub-form">  
            <form onSubmit={handleSubmit} className="pt-8 flex-auto">
                <div className="flex flex-col w-72 gap-6">
                     
                    <Input  label="Name"
                    type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    
                    <Input  label="Street Name"
                    type="text" name="streetName" value={streetName}  onChange={(e) => setStreetName(e.target.value)} />
                    
                    <Input  label="Street Number"
                    type="number" name="streetNumber" value={streetNumber}  onChange={(e) => setStreetNumber(e.target.value)} />
                    
                    <input label="Image"
                    type="file" onChange={(e) => handleFileUpload(e)} />

                    <Button className="w-72 rounded-lg px-4 py-2 bg-gradient-to-tr from-blue-200 to-blue-400 hover:text-white" 
                    type="submit"><b>Add New Club</b></Button>
                    
                </div>

            </form>
            
        </div>

  

    // <div className="bg-gray-500 m-8 pb-5 pl-8 pr-8 rounded-xl shadow-md">
    //   <div className="pt-3 text-center" >
    //   <h3>Add club</h3>
    //   </div>
 
    //   <form onSubmit={handleSubmit}>
    //     <label>name:</label>
    //     <input
    //       type="text"
    //       name="name"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
 
    //     <label>street Name:</label>
    //     <input
    //       type="text"
    //       name="streetName"
    //       value={streetName}
    //       onChange={(e) => setStreetName(e.target.value)}
    //     />

    //     <label>street Number:</label>
    //     <input
    //       type="number"
    //       name="streetNumber"
    //       value={streetNumber}
    //       onChange={(e) => setStreetNumber(e.target.value)}
    //     />

    //     <input type="file" onChange={(e) => handleFileUpload(e)} />
 
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
  );
}
 
export default AddClub;