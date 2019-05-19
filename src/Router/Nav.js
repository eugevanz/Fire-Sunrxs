import React, { useContext } from 'react';
import { LinkContainer } from "react-router-bootstrap"; 
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import firebase from "../Fire";
import { UserContext } from "../Context";

export default () => {
    const [, setUser] = useContext(UserContext);

    const signout = () => firebase.auth().signOut().then(() => setUser(null)).catch(error => console.log(error.code, error.message));

    return <Navbar bg="secondary" sticky="top" variant="dark">

        <Container>
            <DropdownButton id="SUNRXS" title="SUNRXS" variant="secondary" size="sm">
                <Dropdown.Header>Pages</Dropdown.Header>
                <LinkContainer exact to="/" activeClassName="selected"><Dropdown.Item as="button">Dashboard</Dropdown.Item></LinkContainer>
                <LinkContainer exact to="/incidents/" activeClassName="selected"><Dropdown.Item as="button">Incidents</Dropdown.Item></LinkContainer>
                <LinkContainer exact to="/new_incident/" activeClassName="selected"><Dropdown.Item as="button">New Incident</Dropdown.Item></LinkContainer>
                <Dropdown.Divider />
                <Dropdown.Header>Me</Dropdown.Header>
                <Dropdown.Item as="button" onClick={signout}>Sign Out</Dropdown.Item>
            </DropdownButton>

        </Container>

    </Navbar>;
}