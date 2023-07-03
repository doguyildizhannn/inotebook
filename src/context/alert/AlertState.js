import React, { useState } from "react";
import AlertContext from "./alertContext";

const AlertState = (props) => {
    const [alert, setAlert] = useState({messageList: [], alertType: ""});

    const setAlertMessage = (msgList, alertType) => {
        setAlert({messageList: msgList, alertType: alertType});
        setTimeout(() => {
            setAlert({messageList: [], alertType: ""});
        }, 4000);
    }

    return (
        <AlertContext.Provider value={{alert, setAlertMessage}}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState