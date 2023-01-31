import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";
 
const api = axios.create({
    
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5005"
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const signUp = ({ name, email, password }) => {
    return api.post("/auth/signup", {name, email, password})
                   .then(response => response.data)
                   .catch(err => console.error(err))
}

const logIn = ({email, password}) => {
    return api.post("/auth/login", {email, password})
                .then(response => response.data)
                .catch(err => console.error(err))
}

const verifyToken = (storedToken) => {
    return api.get("/auth/verify", { headers: { Authorization: `Bearer ${storedToken}`} })
              .then(response => response.data)
              .catch(err => console.error(err))
}

const uploadPhoto = (uploadData) => {
    return api.post("/api/upload", uploadData)
                .then(response => response.data)
                .catch(err => console.error(err))
}

const editUser = ({name, image }) => {
    return api.put("/api/users", {name, image})
}

const authMethods = {
    signUp,
    logIn,
    verifyToken,
    uploadPhoto,
    editUser
}

export default authMethods;