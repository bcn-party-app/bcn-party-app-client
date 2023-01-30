import { Link } from "react-router-dom"
import { useState } from "react";

const PartyCard = (props) => {
    const {name, club, date, musicGenre, image, attendees} = props;
    // const [attendees, setAttendees] = useState([]);

    return (
        <div className="PartyCard">
            <h3>{name}</h3>
            <h4>Location: {club}</h4>
            <img src={image} alt="partyImage" />
            <p>Date: {date}</p>
            <p>Music genre: {musicGenre}</p>
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
            <button>Attend</button>
            {/* these buttons need to be rendered only if current user is the user who created that party, and then make a request to the specific  */}
            <button>Edit this party</button>
            <button>Delete this party</button>
        </div>
    );
}
 
export default PartyCard;