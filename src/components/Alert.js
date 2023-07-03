import React, { useContext, useRef } from 'react'
import alertContext from '../context/alert/alertContext'

const Alert = () => {
    
    const ctx = useContext(alertContext);
    const { alert } = ctx;

    const key = useRef(0);

    return (
        <div>
            <div className={`alert alert-${alert.alertType}`} role="alert" style={{ display: alert.messageList.length > 0 ? "block" : "none" }}>
                {alert.messageList.map((a) => {
                    key.current++;
                    return <li key={key.current}>
                        {a}
                    </li>;
                })}
            </div>
        </div>
    )
}

export default Alert