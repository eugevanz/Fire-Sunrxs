import React, { useContext, useRef } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import firebase from "../../Fire";
import IncidentCard from "./Incident/_Card";
import { IncidentsContext } from "../../Context";

export default () => {
    const {incidents, setIncidents} = useContext(IncidentsContext);
    const searchBoxText = useRef("");
    
    const getFirebase = () => {
        firebase.database().ref().child("incidents").on("value", snap => {
            const snapshot = Object.values(snap.val());

            setIncidents(snapshot);
            searchBoxText.current.value = ""
        });
    }

    const searchEngine = event => {
        if (event.target.value !== "") {
            let newList = incidents ? incidents.filter(item => {
                const source = item.application.toUpperCase();
                const filter = event.target.value.toUpperCase();

                return source.toUpperCase().indexOf(filter) > -1 ? item : null;
            }) : incidents;
            setIncidents(newList);
        };
    }
    
    return <React.Fragment>
        <Jumbotron fluid className="mb-5 text-light bg-secondary">
            <Container>
                <h1 className="display-4">Incidents</h1>
                <hr className="my-4"/>
                <div className="float-sm-right">
                    <Form>
                        <InputGroup>
                            <FormControl size="sm" placeholder="Search application" aria-label="Search" ref={searchBoxText} onChange={searchEngine}/>
                            <InputGroup.Append>
                                <Button size="sm" variant="success" onClick={getFirebase}>Reset</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </div>
            </Container>
        </Jumbotron>
        <Container>
            <Row className="mb-5">
                {incidents ? incidents.map(item => <Col lg={4} md={6} key={item.id} className="animated zoomIn faster"><IncidentCard data={item}/></Col>) : null}
            </Row>
        </Container>
    </React.Fragment>
};