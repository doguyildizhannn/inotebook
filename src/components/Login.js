import React, { useContext, useState } from 'react'
import UserContext from '../context/user/userContext';
import AlertContext from '../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const host = "http://localhost:3000";

    const [login, setLogin] = useState({ email: "", password: "" });

    const onChange = (e) => {
        setLogin({ ...login, [e.target.id]: e.target.value });
    }

    const usrCntxt = useContext(UserContext);
    const { setUser } = usrCntxt;

    const alrtCntxt = useContext(AlertContext);
    const { setAlertMessage } = alrtCntxt;

    const onSubmitClicked = async (e) => {
        e.preventDefault();
        try {
            const responseLogin = await fetch(`${host}/api/auth/login`, {
                'body': JSON.stringify({ email: login.email, password: login.password }),
                'headers': {
                    "Content-Type": "application/json"
                },
                'method': 'POST'
            });
            const responseLoginData = await responseLogin.json();
            if (responseLoginData.success) {
                setUser({ isLoggedIn: true, authToken: responseLoginData.authToken });
                localStorage.setItem('sesInfo', JSON.stringify({authToken: responseLoginData.authToken, isLoggedIn: true}));
                setAlertMessage(["Logged in successfully."], "success");
                navigate("/");
            }
            else {
                if (Object.prototype.toString.call(responseLoginData.message) === '[object Array]') {
                    let totalMsg = [];
                    for (let index = 0; index < responseLoginData.message.length; index++) {
                        totalMsg.push(responseLoginData.message[index].msg);
                    }
                    setAlertMessage(totalMsg, "warning");
                }
                else if (Object.prototype.toString.call(responseLoginData.message) === '[object String]') {
                    setAlertMessage([responseLoginData.message], "warning");
                }
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className='mt-5'>
            <form>
                <div className="mb-3">
                    <h2 className='my-2'>Login</h2>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={onSubmitClicked}>Login</button>
            </form>
        </div>
    )
}

export default Login