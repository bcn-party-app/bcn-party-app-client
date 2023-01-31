import { createContext, useContext, useState } from "react";
import { AuthContext } from "./auth.context";

const OwnerContext = createContext();

function OwnerProviderWrapper(props) {
    const [isOwner, setIsOwner] = useState(false)
    //how do we grab 1) logged in user and 2) current party?
    const { user, party } = useContext(AuthContext)

    const toggleIfOwner = () => {
    //creating a fn that can be used to update isOwner, by toggling the value between "false" and "true"
        if (user._id === party.owner) {
            setIsOwner(true);
        } else {
            setIsOwner(false);
        }
    };

    return (
        <OwnerProviderWrapper value={{isOwner, toggleIfOwner}}>
            {props.children}
        </OwnerProviderWrapper>
    )
} 

export {OwnerContext, OwnerProviderWrapper};

//TO DO:
//wrap around PartyCard component