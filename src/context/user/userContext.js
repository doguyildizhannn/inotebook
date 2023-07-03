import { createContext } from "react";

const UserContext = createContext({isLoggedIn: false, authToken: null});

export default UserContext;