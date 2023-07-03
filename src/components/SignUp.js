import React, { useContext, useState } from 'react'
import AlertContext from '../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();

    const host = "http://localhost:3000";

    const [signUp, setSignUp] = useState({ name: "", email: "", password: "", cpassword: "" });

    const onChange = (e) => {
        setSignUp({ ...signUp, [e.target.id]: e.target.value });
    }

    const alrtCntxt = useContext(AlertContext);
    const { setAlertMessage } = alrtCntxt;

    const onSubmitClicked = async (e) => {
        e.preventDefault();
        try {
            if (signUp.password !== signUp.cpassword) {
                setAlertMessage(["Password confirmation value is not same with the password that you have entered. Check your confirmation or password."], "warning");
                return;
            }
            const responseSignUp = await fetch(`${host}/api/auth/createuser`, {
                'body': JSON.stringify({ name: signUp.name, email: signUp.email, password: signUp.password }),
                'headers': {
                    "Content-Type": "application/json"
                },
                'method': 'POST'
            });
            const responseSignUpData = await responseSignUp.json();
            if (responseSignUpData.success) {
                setAlertMessage(["Your account has been created."], "success");
                navigate("/login");
            }
            else {
                if (Object.prototype.toString.call(responseSignUpData.message) === '[object Array]') {
                    let totalMsg = [];
                    for (let index = 0; index < responseSignUpData.message.length; index++) {
                        totalMsg.push(responseSignUpData.message[index].msg);
                    }
                    setAlertMessage(totalMsg, "warning");
                }
                else if (Object.prototype.toString.call(responseSignUpData.message) === '[object String]') {
                    setAlertMessage([responseSignUpData.message], "warning");
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
                    <h2 className='my-2'>SignUp</h2>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={onSubmitClicked}>SignUp</button>
            </form>
        </div>
    )
}

export default SignUp