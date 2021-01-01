import React, { useContext, useState } from 'react';
import { Button, Col, Container, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './TaskCard.css';
import TradeForm from '../TradeForm';
import { UserContext } from '../appContext';
import { DEFAULT_PFP } from '../config';

interface IProps {
    task: any,
    deleteTask: Function,
    tradeTask: Function,
    completeTask: Function
}

function TaskCard({ task, deleteTask, tradeTask, completeTask }: IProps) {
    const [showDelConf, setShowDelConf] = useState(false);
    const [showTradeForm, setShowTradeForm] = useState(false);
    const { user, family } = useContext(UserContext);

    const isTaskOwner = (task.assignee === user.user_id);
    const taskOwner = family.filter((memb: any) => {
        return task.created_by === memb.attribute_values.user_id;
    })[0];

    /**filter if current user is task owner. works if multiple assignees */
    // const isTaskOwner = (task.assignee.indexOf(mock.currentUser.user_id) !== -1);

    /*filter for the assignees' informations to display*/
    let assignees = family.filter((memb: any) => {
        return task.assignee === memb.attribute_values.user_id;
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
            {assignees.map((assignee: any) => {
                // increment and decrement avatar styling variables.
                rightPosition += 30;
                zIdx--;
                return (
                    <div style={{ right: rightPosition, zIndex: zIdx }} className="TaskCard-img-wrapper">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip className="TaskCard-tooltip" id={`tooltip-${assignee.attribute_values.user_id}`}>{assignee.attribute_values.first_name}</Tooltip>}
                        >
                            <Image className="TaskCard-img" src={assignee.attribute_values.user_avatar || DEFAULT_PFP} />
                        </OverlayTrigger>
                    </div>
                );
            })}
            <Container>
                {user.family_manager && <div className="TaskCard-delete-btn">
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
                                    Created on {new Date(task.created_at).toString()} by {taskOwner.attribute_values.first_name}
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