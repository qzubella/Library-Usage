import React, { useEffect, useState, useContext } from "react"
import { Button } from "react-bootstrap";
import LoginContext from '../../contexts/LoginContext';
import BadgerMessage from "./BadgerMessage";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [login, setLogin] = useContext(LoginContext);

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_0bf7690d166cd6659c0f"
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

    useEffect(() => {
        loadMessages()
    }, [props]);



    function post (){
        if(title.length < 1 || content.length <1){
            alert("You must provide both a title and content!");
            return;
        }
        else if(!login){
            alert("You must be logged in!");
            return;
        }
        else {
            fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": "bid_0bf7690d166cd6659c0f"
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            }).then(res => {
                if (res.status === 200) {
                    alert('Successfully posted')
                    loadMessages();
                    return res.json();
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
        <h1>{props.name} Chatroom</h1>
        <form>
                <label htmlFor="title">Post Title</label>
                <div/>
                <input id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <div/>
                <label htmlFor="content">Post Content</label>
                <div/>
                <input id="content" value={content} onChange={(e) => setContent(e.target.value)}/>
                <div/>
                
        </form>
        <Button onClick={post} style={{marginTop: "1rem"}}>Create Post</Button>
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        messages.map(x => {
                            return <BadgerMessage key={x.id} reset={loadMessages} id={x.id} room={props.name} title={x.title} created={x.created} poster={x.poster} content={x.content}/>
                        })
                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>
}


        