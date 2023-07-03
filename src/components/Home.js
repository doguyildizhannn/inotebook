import React, { useContext } from 'react'
import Notes from './Notes';
import UserContext from '../context/user/userContext';
import Login from './Login';

const Home = () => {

    const usrCntxt = useContext(UserContext);
    const { user } = usrCntxt;

    return (
        <div>
            {user.isLoggedIn ? <Notes /> : <Login />}
        </div>
    )
}

export default Home