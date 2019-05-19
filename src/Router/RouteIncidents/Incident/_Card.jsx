import React from "react";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import MoreInfo from "./_More_info";
import Update from "./_Update";
import Edit from "./_Edit";
import firebase from "../../../Fire";


export default (props) => {
    const {application,description,impact,startText,end,outageText} = props.data;

    const resolve = () => {
        const body = props.data
        body.end = `${new Date()}`;
        firebase.database().ref().child("incidents").child(body.id).set(body);
    }

    return <Card className="border-0">
        <Card.Body>
            <Card.Title>{application}</Card.Title>
            <small className="text-muted">{startText}</small>
            <Card.Text>{impact}<br/><small className="text-muted">{outageText}</small></Card.Text>
            <Card.Text><small className="text-muted">{description}</small></Card.Text>
            <MoreInfo data={props.data}/>
            <ButtonGroup aria-label="Item options">
                <Update data={props.data}/>
                <Edit data={props.data}/>
                {!end ? <Button variant="success" size="sm" onClick={resolve}>Resolve</Button> : null}
            </ButtonGroup>
        </Card.Body>
    </Card>;
}