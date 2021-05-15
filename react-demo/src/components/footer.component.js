import React from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-bootstrap";


class FooterComponent extends React.Component {
    render = () => {
        return (
            <>
                <div className="footer">
                    <Container >
                        <Row>
                            <Col md>sm=Footer 1</Col>
                            <Col md>sm=Footer 2</Col>
                            <Col md>sm=Footer 3</Col>
                        </Row>
                    </Container>
                    <Container>
                        <p> @copy 2021 </p>
                    </Container>
                </div>
            </>
        )
    }
}

export default FooterComponent