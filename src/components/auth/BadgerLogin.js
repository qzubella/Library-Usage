import React, {useRef, useContext} from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../contexts/LoginContext';
import UserContext from '../../contexts/UserContext';
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function BadgerLogin() {

    const inputUser = useRef();
    const inputPass = useRef();
    const [login, setLogin] = useContext(LoginContext);
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    function handle(){
        navigate('/');
    }

const submit = (values, { setSubmitting }) => {
    fetch("https://cs571.org/s23/hw6/api/login", {
      method: "POST",
       credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CS571-ID": "bid_0bf7690d166cd6659c0f",
      },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    })
       .then((res) => {
        if (res.status === 200) {
          setUser(values.username);
            setLogin(true);
          alert("Login Successful");
          handle();
           return res.json();
        } else if (res.status === 404) {
          alert("Username does not exist");
        } else if (res.status === 401) {
          alert("Password is incorrect");
        } else {
          throw new Error();
        }
      })
        .then((json) => {})
        .catch((e) => {
            alert("That username has already been taken!");
        })
        .finally(() => {
          setSubmitting(false);
          });
    };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required";}
      if (!values.password) {
       errors.password = "Password is required"; }
    return errors;
  };

  return (
    <>
      <h1>Login</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={validate}
        onSubmit={submit}>
        {({ isSubmitting }) => (

        <Form>
          <div>
            <label htmlFor="username">Username</label>
            <Field id="username" name="username" type="text" />
            <ErrorMessage name="username" component="div" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" />
          <ErrorMessage name="password" component="div" />

          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            style={{ marginTop: "1rem" }}>
            Login
          </Button>
        </Form>
        )}
      </Formik>
    </>
  );
}