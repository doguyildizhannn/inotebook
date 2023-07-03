import React, { useContext } from 'react'
import { Link, useLocation } from "react-router-dom";
import UserContext from '../context/user/userContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    let location = useLocation();

    const usrCntxt = useContext(UserContext);
    const { user, setUser } = usrCntxt;

    const navigate = useNavigate();

    const logoutClicked = () => {
        setUser({isLoggedIn: false, authToken: null});
        localStorage.removeItem('sesInfo');
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" style={{ display: user.isLoggedIn ? "block" : "none" }}>
                            <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <Link className="btn btn-primary mx-1" to="/login" role="button" id="loginButton" style={{ display: user.isLoggedIn ? "none" : "block" }}>Login</Link>
                        <Link className="btn btn-primary mx-1" to="/signup" role="button" id="signupButton" style={{ display: user.isLoggedIn ? "none" : "block" }}>SignUp</Link>
                        <button className="btn btn-primary mx-1" type="button" id="logoutButton" onClick={logoutClicked} style={{ display: user.isLoggedIn ? "block" : "none" }}>Logout</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar