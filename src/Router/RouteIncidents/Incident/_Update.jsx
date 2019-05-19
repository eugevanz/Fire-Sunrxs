import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import firebase from "../../../Fire";

export default (props) => {
    const [show, setShow] = useState(false);
    const [update, setUpdate] = useState("");
    const myRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        const body = props.data;
        body.actions = `${body.actions}. ${update}`;

        firebase.database().ref().child("incidents").child(body.id).set(body);
        
        myRef.current.value = "";
        console.log(body);
        setShow(false);
    }

    return <React.Fragment>
        <Button variant="secondary" size="sm" onClick={() => setShow(true)}>Update</Button>
        
        <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>New Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form className="needs-validation">
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text>Update</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control type="text" ref={myRef} onChange={e => setUpdate(e.target.value)} required></Form.Control>
                </InputGroup>
                <Modal.Footer>
                    <Button variant="primary" size="sm" type="submit" onClick={handleSubmit}>Save changes</Button>
                </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    </React.Fragment>;
}