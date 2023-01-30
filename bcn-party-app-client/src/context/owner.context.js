import { createContext } from "react";
import Party from "../../../../bcn-party-app-server/models/Party.model";

const OwnerContext = createContext();

function OwnerProviderWrapper(props) {
    const [isOwner, setIsOwner] = useState(false)
    const
    //how do we grab 1) logged in user and 2) current party?
    const showIfOwner = () => {
    //if logged in User is owner of the party, allow them to delete/edit party
    
    
        if (req.payload._id === party.owner) {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }
    };

    return (
        <OwnerProviderWrapper value={{isOwner, showIfOwner}}>
            {props.children}
        </OwnerProviderWrapper>
    )
} 

export {OwnerContext};

//TO DO:
//wrap around PartyCard component