import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

export default (props) => {
    const [show, setShow] = useState(false);
    const {application,startText,impact,description,end,endText,actions} = props.data;

    return <React.Fragment>
        <Button variant="info" size="sm" className="mr-2" onClick={() => setShow(true)}>More</Button>

        <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>More</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card className="border-0">
                    <Card.Body>
                        <Card.Title>{application}</Card.Title>
                        <small className="text-muted">{startText}</small>
                        <Card.Text>{impact}</Card.Text>
                        <Card.Text><small className="text-muted">{description}</small></Card.Text>
                        {end ? <small className="text-muted">Resolved {endText}</small> : <small className="text-muted">Open</small>}
                        <Card.Text>{actions}</Card.Text>
                    </Card.Body>
                </Card>
            </Modal.Body>
        </Modal>
    </React.Fragment>;
}