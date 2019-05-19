import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import firebase from "../../../Fire";

export default (props) => {
    const [show, setShow] = useState(false);
    const [application, setApplication] = useState(props.data.application);
    const [description, setDescription] = useState(props.data.description);
    const [priority, setPriority] = useState(props.data.priority);
    const [resolver, setResolver] = useState(props.data.resolver);

    const handleSubmit = (event) => {
        event.preventDefault();

        const body = props.data;
        body.application = application;
        body.description = description;
        body.priority = priority;
        body.resolver = resolver;

        firebase.database().ref().child("incidents").child(body.id).set(body);
        setShow(false);
    }
    

    return <React.Fragment>
        <Button variant="danger" size="sm" onClick={() => setShow(true)}>Edit</Button>

        <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="needs-validation" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Affected Application</Form.Label>
                        <Form.Control type="text" size="sm" placeholder="Which application/s have been impacted." value={application} onChange={e => setApplication(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Issue Cause</Form.Label>
                        <Form.Control type="text" size="sm" placeholder="Fully detail the cause of the issue." value={description} onChange={e => setDescription(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Priority of Impact</Form.Label>
                        <Form.Control as="select" size="sm" value={priority} onChange={e => setPriority(e.target.value)}>
                            <option value="1-Extensive/Widespread">1-Extensive/Widespread</option>
                            <option value="2-Significant/Large">2-Significant/Large</option>
                            <option value="3-Moderate/Limited">3-Moderate/Limited</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Resolver</Form.Label>
                        <Form.Control type="text" size="sm" placeholder="Who is working on the issue." value={resolver} onChange={e => setResolver(e.target.value)} required/>
                    </Form.Group>
                    <Modal.Footer>
                        <Button type="submit" variant="primary" size="sm">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    </React.Fragment>;
}