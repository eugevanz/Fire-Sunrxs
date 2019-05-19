import React, { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import firebase from "../../Fire";

export default (props) => {
    const [actions] = useState("Under investigation"), [start] = useState(`${new Date()}`), [priority, setPriority] = useState("2-Significant/Large"), [impact, setImpact] = useState(""), [application, setApplication] = useState(""), [description, setDescription] = useState(""), [reporter, setReporter] = useState(""), [resolver, setResolver] = useState("");
    const myRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const id = `INC${new Date().getTime()}`;
        const body = {
            id: id, impact: impact, application: application, description: description, priority: priority, reporter: reporter, resolver: resolver, start: start, actions: actions
        };
        
        myRef.current.reset();
        firebase.database().ref().child("incidents").child(id).set(body, error => error ? console.log(error) : props.history.push("/incidents"));
    }
    
    return <React.Fragment>
        <Jumbotron fluid className="mb-5 text-light bg-secondary">
            <Container>
                <h1 className="display-4">New Incident</h1>
            </Container>
        </Jumbotron>
        <Container>
            <Form ref={myRef} className="needs-validation" onSubmit={handleSubmit}>
                <Row>
                    <Col md={6} lg={4} className="animated zoomIn faster">
                        <Form.Group>
                            <Form.Label>Business Impact</Form.Label>
                            <Form.Control type="text" size="sm" placeholder="Summarise current impact to business." onChange={e => setImpact(e.target.value)} required/>
                        </Form.Group>
                    </Col>
                    <Col md={6} lg={4} className="animated zoomIn faster">
                        <Form.Group>
                            <Form.Label>Affected Application</Form.Label>
                            <Form.Control type="text" size="sm" placeholder="Which application/s have been impacted." onChange={e => setApplication(e.target.value)} required/>
                        </Form.Group>
                    </Col>
                    <Col md={6} lg={4} className="animated zoomIn faster">
                        <Form.Group>
                            <Form.Label>Issue Cause</Form.Label>
                            <Form.Control type="text" size="sm" placeholder="Fully detail the cause of the issue." onChange={e => setDescription(e.target.value)} required/>
                        </Form.Group>
                    </Col>
                    <Col md={6} lg={4} className="animated zoomIn faster">
                        <Form.Group className="w-75">
                            <Form.Label>Priority of Impact</Form.Label>
                            <Form.Control as="select" size="sm" onChange={e => setPriority(e.target.value)}>
                                <option value="2-Significant/Large">2-Significant/Large</option>
                                <option value="1-Extensive/Widespread">1-Extensive/Widespread</option>
                                <option value="3-Moderate/Limited">3-Moderate/Limited</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={6} lg={4} className="animated zoomIn faster">
                        <Form.Group>
                            <Form.Label>Reporter</Form.Label>
                            <Form.Control type="text" size="sm" placeholder="Who reported the issue." onChange={e => setReporter(e.target.value)} required/>
                        </Form.Group>
                    </Col>
                    <Col md={6} lg={4} className="animated zoomIn faster">
                        <Form.Group>
                            <Form.Label>Resolver</Form.Label>
                            <Form.Control type="text" size="sm" placeholder="Who is working on the issue." onChange={e => setResolver(e.target.value)} required/>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" size="sm" className="mt-5 mb-5 animated zoomIn faster">Submit</Button>
            </Form>
        </Container>
    </React.Fragment>;
}