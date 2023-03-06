import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap";

export default function BadgerRegister() {
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [cNewPassword, setcNewPassword] = useState("");
    
    const register = () => {
        if(newUsername.length < 1 || newPassword.length <1){
            alert("You must provide both a username and password!");
            return;
        }
        else if(newPassword != cNewPassword){
            alert("Your passwords do not match!");
            return;
        }
        else {
            fetch('https://cs571.org/s23/hw6/api/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": "bid_0bf7690d166cd6659c0f"
                },
                body: JSON.stringify({
                    username: newUsername,
                    password: newPassword
                })
            }).then(res => {
                if (res.status === 200) {
                    alert('Successfully registered')
                    return res.json();
                } else if (res.status === 409){
                    alert('That username has already been taken!')
                    return
                }
                else {
                    throw new Error()
                }
            }).then(json => {
                
                
            }).catch(e => {
                alert('Error!')
            })
        }
    }



    return <>
        <h1>Register</h1>
        <form>
                <label htmlFor="username">Username</label>
                <div/>
                <input id="title" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
                <div/>
                <label htmlFor="password">Password</label>
                <div/>
                <input id="password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                <div/>
                <label htmlFor="cpassword">Confirm Password</label>
                <div/>
                <input id="cpassword" type="password" value={cNewPassword} onChange={(e) => setcNewPassword(e.target.value)}/>
        </form>
        <Button onClick={register} style={{marginTop: "1rem"}}>Register</Button>
    </>
}