import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


const PartyCard = (props) => {
    const {name, club, date, musicGenre, image, attendees, owner} = props;
    // const [attendees, setAttendees] = useState([]);
    const {partyId} = useParams;
    const navigate = useNavigate();
    //updating the consumer component PartyCard so it can properly access the isOwner value from OwnerContext.Provider
    const {user} = useContext(AuthContext);  //can access id of curr logged in user

    const deleteParty = () => {
        //make a DELETE request to delete the Party
        axios.delete(`${process.env.REACT_APP_API_URL}/api/party/${partyId}`)
    // Once the delete request is resolved successfully, navigate back to the list of parties
        .then(() => navigate("/party"))
        .catch((err) => console.log(err));
    };
    
    return (
        <div className="PartyCard">
            <h3>{name}</h3>
            <h4>Location: {club}</h4>
            <img src={image} alt="partyImage" />
            <p>Date: {date}</p>
            <p>Music genre: {musicGenre}</p>
            <p>Party host: {owner}</p>
            <h5>Attendees: <span>{attendees.length}</span></h5>
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
            </ul>
            {/* this button needs to toggle between attend/don't attend and needs to make a call to the routes in the backend*/}
{/*  */}
            <button>Attend</button>

            {/* the edit/delete buttons below need to be rendered only if current user is the user who created that party, and then make a request to the specific API  */}
            {   
                user._id === owner &&
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