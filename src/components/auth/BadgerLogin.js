import React, {useRef, useContext} from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../contexts/LoginContext';
import UserContext from '../../contexts/UserContext';

export default function BadgerLogin() {

    const inputUser = useRef();
    const inputPass = useRef();
    const [login, setLogin] = useContext(LoginContext);
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    function handle(){
        navigate('/');
    }

    const login2 = () => {
        if(inputUser.current.value.length < 1 || inputPass.current.value.length <1){
            alert("You must provide both a username and password!");
            return;
        }
      
        else {
            fetch('https://cs571.org/s23/hw6/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": "bid_0bf7690d166cd6659c0f"
                },
                body: JSON.stringify({
                    username: inputUser.current.value,
                    password: inputPass.current.value
                })
            }).then(res => {
                if (res.status === 200) {
                    setUser(inputUser.current.value);
                    setLogin(true);
                    alert('Login Successful')
                    handle();
                    return res.json();
                } 
                else if (res.status === 404) {
                    alert('Username does not exist')
                }
                else if (res.status === 401) {
                    alert('Password is incorrect')
                }else {
                    throw new Error()
                }
            }).then(json => {
                
                
            }).catch(e => {
                alert('That username has already been taken!')
            })
        }
    }

    return <>
        <h1>Login</h1>
        <form>
                <label htmlFor="username">Username</label>
                <div/>
                <input id="title" ref={inputUser}/>
                <div/>
                <label htmlFor="password">Password</label>
                <div/>
                <input id="password" type="password" ref={inputPass}/>
                <div/>
                
        </form>
        <Button onClick={login2} style={{marginTop: "1rem"}}>Login</Button>
    </>
}