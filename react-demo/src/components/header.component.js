import React from 'react';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { Helmet } from "react-helmet";



class HeaderComponent extends React.Component {
    render = () => {
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <Nav.Link href="/products/add">Add Product</Nav.Link> */}
                            <Nav.Link href="/products/add">List Product</Nav.Link>
                            <Nav.Link href="/cart">Cart</Nav.Link>
                            {/* <Nav.Link href="/comments">Comments</Nav.Link>
                            <Nav.Link href="/posts">Posts</Nav.Link> */}
                            {/* <Nav.Link href="#photos">Photos</Nav.Link>
                            <Nav.Link href="#posts">Posts</Nav.Link>
                            <Nav.Link href="#todos">Todos</Nav.Link> */}
                            {/* <Nav.Link href="/users">Users</Nav.Link> */}
                            {/* <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        {/* <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}

export default HeaderComponent