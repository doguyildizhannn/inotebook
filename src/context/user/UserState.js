import UserContext from "./userContext";
import React, { useState } from 'react'

const UserState = (props) => {

    const sesInfo = localStorage.getItem('sesInfo');
    const sesObject = JSON.parse(sesInfo);

    const [user, setUser] = useState(sesInfo !== null ? sesObject : { isLoggedIn: false, authToken: null });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState