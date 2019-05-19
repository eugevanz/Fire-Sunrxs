import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { UserContext } from "./Context";
import firebase from "./Fire";


export default () => {
    const [, setUser] = useContext(UserContext);
    const [emailAlert, setEmailAlert] = useState("We'll never share your email with anyone else.");
    const [alertClass, setAlertClass] = useState("text-muted");
    const [email, setEmail] = useState(""), [password, setPassword] = useState("");

    const changeAuthState = (event) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password).then(user => setUser(user)).catch(error => {
            setEmailAlert(error.message);
            setAlertClass("text-danger");
        });
    }

    return <React.Fragment>
        <Jumbotron className="mb-5">
            <Container>
                <h1 className="display-4">SUNRXS</h1>
                <p className="lead">Report Management Tool</p>
                <hr className="my-4"/>
                <p>Use the below form to login into your account.</p>
            </Container>
        </Jumbotron>

        <Container>
            <Form onSubmit={changeAuthState}>
                <Row>
                    <Col lg={4} md={6}>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" onChange={e => setEmail(e.target.value)} required/>
                            <Form.Text className={`${alertClass}`}>{emailAlert}</Form.Text>
                        </Form.Group>
                    </Col>
                    <Col lg={4} md={6}>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" onChange={e => setPassword(e.target.value)} required/>
                        </Form.Group>
                    </Col>
                </Row>
                <Button type="submit" variant="primary" size="sm" className="mt-5 mb-5">Login</Button>
            </Form>
        </Container>
    </React.Fragment>
}