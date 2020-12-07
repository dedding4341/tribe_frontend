import React from 'react';
import { Button, Col, Container, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './TaskCard.css';

interface IProps {
    task: any
}

const currentUser = { first_name: "Diana", user_id: 231, user_avatar: 'https://pbs.twimg.com/media/Emvpv3DW8AEVEpm.jpg', family_manager: true };
const familyMembers = [{ first_name: "Taka", user_id: 321, user_avatar: 'https://i.pinimg.com/originals/8d/5f/62/8d5f62968c07c376fb2e4d3b12b248d9.png' }, { first_name: "Diana", user_id: 231, user_avatar: 'https://pbs.twimg.com/media/Emvpv3DW8AEVEpm.jpg' }, { first_name: "Danny", user_id: 132, user_avatar: 'https://www.kindpng.com/picc/m/102-1027630_kawaii-cute-red-bunny-strawberry-strawberries-kawaii-animal.png' }, { first_name: "Dennis", user_id: 123, user_avatar: 'https://cdn.shopify.com/s/files/1/2040/0303/products/Simple_Cute_Kawaii_Nursery_Animal_Cartoon_-_Penguin_696545712_1024x1024@2x.jpg?v=1499733886' }];
const defaultPfp = 'https://m.media-amazon.com/images/I/41qqZPwvIRL._AC_.jpg';

function TaskCard({ task }: IProps) {

    // filter for the assignees' informations to display
    let assignees = familyMembers.filter(memb => {
        return task.assignee.indexOf(memb.user_id) !== -1;
    });

    
    const handleTaskDelete = () => {
        // placeholder before adding the actual logic ^. ^ 
        alert("Are you sure you want to delete?");
    }

    // avatar dynamic styling
    let rightPosition = -30
    let zIdx = assignees.length;

    return (
        <div className="TaskCard">
            {assignees.map(assignee => {
                // increment and decrement avatar styling variables.
                rightPosition += 30;
                zIdx--;
                return (
                    <div style={{ right: rightPosition, zIndex: zIdx }} className="TaskCard-img-wrapper">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip className="TaskCard-tooltip" id={`tooltip-${assignee.user_id}`}>{assignee.first_name}</Tooltip>}
                        >
                            <Image className="TaskCard-img" src={assignee.user_avatar || defaultPfp} />
                        </OverlayTrigger>
                    </div>
                );
            })}
            <Container>
                { currentUser.family_manager && <div className="TaskCard-delete-btn">
                    <FontAwesomeIcon style={{cursor: "pointer"}} icon={faTimes} size="2x" onClick={handleTaskDelete} />
                </div>}
                <Row className="d-flex align-items-center justify-content-between">
                    <Col sm={6} md="auto">
                        <Row className="TaskCard-header">
                            <h3>{task.task_name}</h3>
                            <span className="TaskCard-pts">+{task.associated_points}pts</span>
                        </Row>
                        <Row>
                            <div className="TaskCard-deadline ml-2">
                                Due by {task.completion_time}
                            </div>
                        </Row>
                    </Col>
                    <Col sm={6} md="auto">
                        <Button className="TaskCard-button">{task.assignee.indexOf(currentUser.user_id) !== -1 ? "Complete" : "Trade"}</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TaskCard;