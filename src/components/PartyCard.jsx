import { Link, useNavigate } from "react-router-dom"

import { useContext } from "react";

import { AuthContext } from "../context/auth.context";
import axios from "axios";
import partyPlaceholder from "../assets/default-avatar.png"

const API_URL = "http://localhost:5005";
// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

const PartyCard = (props) => {
    const {name, club, date, musicGenre, image, attendees, owner, _id, getAllParties} = props;
    // const [attendees, setAttendees] = useState([]);
    const partyId = _id;
    const navigate = useNavigate();
    //updating the consumer component PartyCard so it can properly access the isOwner value from OwnerContext.Provider
    const {user} = useContext(AuthContext);  //can access id of curr logged in user

    const deleteParty = () => {
        //make a DELETE request to delete the Party
        axios.delete(`${API_URL}/api/party/${partyId}`)
        .then(() => getAllParties())
    // Once the delete request is resolved successfully, navigate back to the list of parties
        .then(() => navigate("/party"))
        .catch((err) => console.log(err));
    };

    const attendParty = () => {
        const storedToken = localStorage.getItem('authToken');

        axios.put(`${API_URL}/api/party/${partyId}/attend-party`, {userId : user._id} , {headers: {Authorization: `Bearer ${storedToken}`}})
        .then(() => getAllParties())
        .then(() => console.log("attendee is joining"))
        .catch((err) => console.log(err))
    }

    const leaveParty = () => {
        const storedToken = localStorage.getItem('authToken');

        axios.put(`${API_URL}/api/party/${partyId}/leave-party`, {userId : user._id}, {headers: {Authorization: `Bearer ${storedToken}`}})
        .then(() => getAllParties())
        .then(() => console.log("attendee is leaving"))
        .catch((err) => console.log(err))
    }
    
    return (
        <div className="PartyCard" key={_id}>
            <h3>{name}</h3>
            <h4>Location: {club.name}</h4>
            <img src={image !== "" ? image : partyPlaceholder} alt="partyImage" />
            <p>Date: {date}</p>
            <p>Music genre: {musicGenre}</p>
            <p>Party host: {owner.name}</p>
            <h5>Attendees: <span>{attendees.length}</span></h5>
            {attendees.length > 0 && 
            <ul>
            {attendees.map((attendee) => {
                return (
                    <div className="Attendee" key={attendee._id}>
                        <li>{attendee.name}
                            <img src={attendee.image} alt="userImage" />
                        </li>
                    </div>
                )
            })}
            </ul>}
            
            {/* this button needs to toggle between attend/don't attend and needs to make a call to the routes in the backend*/}
{/*  */}

            {attendees.includes(user._id) ? <button onClick={leaveParty}>Cancel attendance</button> : <button onClick={attendParty}>Attend</button>}



            {/* the edit/delete buttons below need to be rendered only if current user is the user who created that party, and then make a request to the specific API  */}
            {   
                user._id === owner._id &&
                <>
                <Link to={`/party/${partyId}/edit`}>
                    <button>Edit this party</button>
                </Link>

                <button onClick={deleteParty}>Delete this party</button>
                </>
            }

        </div>
    );
}
 
export default PartyCard;