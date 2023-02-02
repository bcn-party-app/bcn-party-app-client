
// import { Link } from "react-router-dom"
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import avatarImage from '../assets/default-avatar.png';
import SelectClub from "../components/SelectClub"

const API_URL = "http://localhost:5005";
//const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

const ProfilePage = props => {
    const [showUpload, setShowUpload] = useState(false);
    const [image, setImage] = useState("");
    const { user, setUser } = useContext(AuthContext);
    

    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);
     
        const uploadData = new FormData();
     
       
        uploadData.append("image", e.target.files[0]);
     
        axios.post(`${API_URL}/api/upload`, uploadData)
          .then(response => {
            // console.log("response is: ", response);
            // response carries "fileUrl" which we can use to update the state
            setImage(response.data.image);
          })
           
          .catch(err => console.log("Error while uploading the file: ", err));
      };

      const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`${API_URL}/api/users`, {...user, image})
            .then((response)=> {
                setUser(response.data.updatedUser);
                setImage("")
            })
            .catch(err => console.error(err))
      }
  return (
<div className="bg-gray-300 flex items-center  flex-col">
    <div className="">
        <div style={{ width: 'inherit'}}>  
            <h1>Profile</h1>
            <p className="field">Name:</p>
            <p>{user?.name}</p>
          
        </div>
             <div className="">
                <div>
                    {user && 
                    user.image ? 
                    <img src={user.image} alt={"profile_image"} style={{width: '100px',  borderRadius: '75%'}} /> :
                    <img src={avatarImage} alt={"profile_image"} style={{width: '100px',  borderRadius: '75%'}} />
                    }
                    {!showUpload &&
                    <button onClick={()=> setShowUpload(!showUpload)}>Edit Photo</button>
                    }
                </div> 
                <div>
                {showUpload && 
                        (<form onSubmit={handleSubmit} className="updateImageForm">
                            <input type="file" onChange={(e) => handleFileUpload(e)} />
                            <button type="submit">Save new profile image</button>
                            </form>)
                    }
                </div> 
            </div>
    </div>
    <SelectClub />
</div>
  )
}

export default ProfilePage;

