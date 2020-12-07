import React, { useState } from 'react';
import { Button, Col, Container, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './TaskCard.css';
import TradeForm from '../TradeForm';
import * as mock from '../mock';

interface IProps {
    task: any,
    deleteTask: Function,
    tradeTask: Function,
    completeTask: Function
}

const defaultPfp = 'https://m.media-amazon.com/images/I/41qqZPwvIRL._AC_.jpg';

function TaskCard({ task, deleteTask, tradeTask, completeTask }: IProps) {
    const [showDelConf, setShowDelConf] = useState(false);
    const [showTradeForm, setShowTradeForm] = useState(false);
    const isTaskOwner = (task.assignee.indexOf(mock.currentUser.user_id) !== -1);

    // filter for the assignees' informations to display
    let assignees = mock.familyMembers.filter(memb => {
        return task.assignee.indexOf(memb.user_id) !== -1;
    });

    const handleTaskDelete = () => {
        deleteTask(task.task_id);
        setShowDelConf(false);
    }

    const handleTradeTask = (data: any) => {
        tradeTask(task.task_id, data.recipients);
    }

    const handleCompleteTask = () => {
        completeTask(task.task_id);
    }

    // avatar dynamic styling
    let rightPosition = -30
    let zIdx = assignees.length;

    return (
        <div className="TaskCard">
            <TradeForm show={showTradeForm} handleTradeTask={handleTradeTask} handleClose={() => setShowTradeForm(false)}/>
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
                {mock.currentUser.family_manager && <div className="TaskCard-delete-btn">
                    <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faTimes} size="2x" onClick={() => setShowDelConf(!showDelConf)} />
                </div>}
                {showDelConf ?
                    // HTML for task deletion confirmation 
                    <Row className="d-flex align-items-center justify-content-between">
                        <Col sm={6} md={6}>
                            <h4>Delete task for {task.task_name}?</h4>
                        </Col>
                        <Col sm={6} md={6}>
                            <Button className="TaskCard-btn TaskCard-btn-yes" onClick={handleTaskDelete}>Yes</Button>
                            <Button className="TaskCard-btn TaskCard-btn-no" onClick={() => setShowDelConf(false)}>No</Button>
                        </Col>
                    </Row>
                    :
                    // HTML for task details 
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
                            <Button className="TaskCard-btn" onClick={isTaskOwner ? handleCompleteTask : () => setShowTradeForm(true)}>{isTaskOwner ? "Complete" : "Trade"}</Button>
                        </Col>
                    </Row>
                }
            </Container>
        </div>
    )
}

export default TaskCard;