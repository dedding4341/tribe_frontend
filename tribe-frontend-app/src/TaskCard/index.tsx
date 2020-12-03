import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import './TaskCard.css';

function TaskCard() {
    const pts = 5;
    const deadline = "today at 6:00pm";
    const isOwner = false;
    return (
        <div className="TaskCard">
            <div className="TaskCard-img-wrapper">
                <Image className="TaskCard-img" src="https://pbs.twimg.com/media/Emvpv3DW8AEVEpm.jpg" />
            </div>
            <Container>
                <Row className="d-flex align-items-center">
                    <Col sm={6} md={8}>
                        <Row className="TaskCard-header">
                            <h3>Movie nite w/ fam!</h3>
                            <span className="TaskCard-pts">+{pts}pts</span>
                        </Row>
                        <Row>
                            <div className="TaskCard-deadline ml-2">
                                Due by {deadline}
                            </div>
                        </Row>
                    </Col>
                    <Col sm={6} md={4}>
                        <Button className="TaskCard-button">{isOwner ? "Complete" : "Trade"}</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TaskCard;
            // <div className="cardContent">
            //     <span className="NameAndPoint">
            //         <h3>Task name</h3>
            //         <h5>number of points</h5>
            //     </span>
            //     <div className="taskDetails">
            //         Task details here
            //     </div>
            // </div>
            // <div className="trade-complete-button">
            //     Trade
            // </div>