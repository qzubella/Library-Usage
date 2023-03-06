import React, { useEffect, useContext } from 'react';
import LoginContext from '../../contexts/LoginContext';

export default function BadgerLogout() {

    const [login, setLogin] = useContext(LoginContext);


    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_0bf7690d166cd6659c0f"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            setLogin(false);
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}