import React,  { useEffect, useState, useContext }from "react"
import LoginContext from '../../contexts/LoginContext';
import { Button } from "react-bootstrap";
import UserContext from '../../contexts/UserContext';

function BadgerMessage(props) {
    const [login, setLogin] = useContext(LoginContext);
    const [user, setUser] = useContext(UserContext);

    const dt = new Date(props.created);

    function useit(){
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.room}/messages/${props.id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": "bid_0bf7690d166cd6659c0f"
                }
            }).then(res => {
                if (res.status === 200) {
                    alert('Successfully Deleted')
                    
                }
            }).then(json => {
                
                
            }).catch(e => {
                alert('')
            })
            setTimeout(props.reset, 300);
        return
    }
    


    function del(){
        if (login){
        
            if(props.poster == user){
                return <Button onClick={useit} variant="danger" style={{marginTop: "1rem"}}>Delete Post</Button>
            }

        }
        else{
            return
        }
    }

    return <>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/><br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {del()}
        
    </>
}

export default BadgerMessage;

/**
 * fetch(`https://cs571.org/s23/hw6/api/whoami`, {
            credentials: 'include',
            headers: {
                "X-CS571-ID": "bid_0bf7690d166cd6659c0f"
            }
        }).then(res => res.json()).then(json => {
            setUser(json.username);

        });
 */