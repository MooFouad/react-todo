import React from 'react'
import { useEffect } from 'react';
const Alert = ({type, msg, removeAlert, list}) => {
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            removeAlert()
        },3000)
        return ()=> clearTimeout(timeout)
    },[list]) //when do I want this to happen 'when the component render'
    // so every time if list is change I'll get new set of time 
    return ( 
        <section>
            <p className={`alert alert-${type}`}>
                {msg}
            </p>
        </section>
    );
}

export default Alert;