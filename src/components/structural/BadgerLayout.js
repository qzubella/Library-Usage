import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import LoginContext from '../../contexts/LoginContext';

import crest from '../../assets/uw-crest.svg'

function BadgerLayout(props) {
    
    
    const [login, setLogin] = useContext(LoginContext);
    
    function loginf(){
        if(login){
          return <Nav.Link as={Link} to="logout">Logout</Nav.Link>
        }
        else{
          return  <><Nav.Link as={Link} to="login">Login</Nav.Link> <Nav.Link as={Link} to="register">Register</Nav.Link></>
        }
      }


    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                       {loginf()}
                        <NavDropdown title="Chatrooms">
                            {
                               /* TODO Display a NavDropdown.Item for each chatroom that sends the user to that chatroom! */
                               props.chatrooms.map(x => {
                                return <NavDropdown.Item key={x} as={Link} to={`chatrooms/${x}`}>{x}</NavDropdown.Item>
                               })
                            }
                        </NavDropdown>

                    </Nav>
                </Container>
            </Navbar>
            <div className="body-spacer">
                <Outlet />
            </div>
        </div>
    );
}

export default BadgerLayout;