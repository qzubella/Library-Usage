import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import LoginContext from '../../contexts/LoginContext';
import BadgerLayout from './BadgerLayout';
import BadgerLogin from '../auth/BadgerLogin';
import BadgerRegister from '../auth/BadgerRegister';
import BadgerLogout from '../auth/BadgerLogout';
import BadgerChatroom from '../content/BadgerChatroom';
import BadgerChatHome from '../content/BadgerChatHome';
import BadgerNoMatch from '../content/BadgerNoMatch';

function BadgerApp() {

  const [login, setLogin] = useState(false);
  const [user, setUser] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  

  useEffect(() => {
    fetch('https://cs571.org/s23/hw6/api/chatroom', {
      headers: {
        "X-CS571-ID": "bid_0bf7690d166cd6659c0f",
      }
    }).then(res => res.json()).then(json => {
      setChatrooms(json)
    })
  }, []);

  

  return (
    <LoginContext.Provider value={[login, setLogin]}>
    <UserContext.Provider value={[user, setUser]}>
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<BadgerLayout chatrooms={chatrooms} />}>
          <Route index element={<BadgerChatHome />} />
          <Route path="/login" element={<BadgerLogin />}></Route>
          <Route path="/register" element={<BadgerRegister />}></Route>
          <Route path="/logout" element={<BadgerLogout />}></Route>
          {
            chatrooms.map(chatroom => {
              return <Route key={chatroom} path={`chatrooms/${chatroom}`} element={<BadgerChatroom name={chatroom} />} />
            })
          }
          <Route path="*" element={<BadgerNoMatch />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
    </LoginContext.Provider>
  );
}

export default BadgerApp;
