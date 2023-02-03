
// import { Link } from "react-router-dom"
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import avatarImage from '../assets/default-avatar.png';
import {
    
    Typography,
    Button,
    
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Tooltip,} from "@material-tailwind/react";

const API_URL = "https://bcn-party.cyclic.app";
//const API_URL = process.env.REACT_APP_API_URL || "https://bcn-party.cyclic.app";

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
    <Card className="w-96">
      <CardHeader floated={false} className="h-80">
      <div>
                    {user && 
                    user.image ? 
                    <img src={user.image} alt={"profile_image"} className="" /> :
                    <img src={avatarImage} alt={"profile_image"} style={{width: '100px', height: '100px',  borderRadius: '75%'}} />
                    }
                    {!showUpload &&
                    <button className="w-80 rounded-lg px-4 py-2 bg-gradient-to-tr from-blue-600 to-blue-400 text-white" onClick={()=> setShowUpload(!showUpload)}>Edit Photo</button>
                    }
                </div> 
                <div>
                {showUpload && 
                        (<form onSubmit={handleSubmit} className="rounded-lg px-4 py-2 bg-gradient-to-tr">
                            <input className="rounded-lg px-4 py-2 bg-gradient-to-tr" type="file" onChange={(e) => handleFileUpload(e)} />
                            <button className="rounded-lg px-4 py-2 bg-gradient-to-tr from-blue-600 to-blue-400 text-white" type="submit">Save new profile image</button>
                            </form>)
                    }
                </div> 
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
        {user?.name}
        </Typography>
        <Typography color="blue" className="font-medium" textGradient>
          CEO / Co-Founder
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <Typography
            as="a"
            href="#facebook"
            variant="lead"
            color="blue"
            textGradient
          >
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#twitter"
            variant="lead"
            color="light-blue"
            textGradient
          >
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#instagram"
            variant="lead"
            color="purple"
            textGradient
          >
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>


/* <div className="bg-gray-300 flex items-center  flex-col">
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
                    <img src={user.image} alt={"profile_image"} style={{width: '100px', height: '100px',  borderRadius: '75%'}} /> :
                    <img src={avatarImage} alt={"profile_image"} style={{width: '100px', height: '100px',  borderRadius: '75%'}} />
                    }
                    {!showUpload &&
                    <Button className="rounded-lg px-4 py-2 bg-gradient-to-tr from-blue-600 to-blue-400 hover:text-white" onClick={()=> setShowUpload(!showUpload)}>Edit Photo</Button>
                    }
                </div> 
                <div>
                {showUpload && 
                        (<form onSubmit={handleSubmit} className="rounded-lg px-4 py-2 bg-gradient-to-tr">
                            <input className="rounded-lg px-4 py-2 bg-gradient-to-tr" type="file" onChange={(e) => handleFileUpload(e)} />
                            <Button className="rounded-lg px-4 py-2 bg-gradient-to-tr from-blue-600 to-blue-400 hover:text-white" type="submit">Save new profile image</Button>
                            </form>)
                    }
                </div> 
            </div>
    </div>
    
</div> */

  )
}

export default ProfilePage;

