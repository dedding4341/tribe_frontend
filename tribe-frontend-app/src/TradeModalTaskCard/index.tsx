import React, { useState } from 'react';
import { Button, Col, Container, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import moment from "moment";
import './TradeModalTaskCard.css';
import { BASE_URL, DEFAULT_PFP } from '../config';
import { useSelector } from 'react-redux';
import { counterParty } from '../actionCreators';
import { getCookie } from '../helpers';

interface IProps {
    task: any,
}

/**
 * TaskCard component displays each task.
 * Handler functions to delegate task-related CRUD operations.
 */
function TaskModalTaskCard({ task } :IProps) {
    const [showDelConf, setShowDelConf] = useState(false);
    const [showTradeForm, setShowTradeForm] = useState(false);
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const user = useSelector((st: any) => st.user);
    const famMembers = useSelector((st: any) => st.famMembers)
    const isTaskOwner = (task.assignee === user.user_id);
    const counterTask = useSelector((st: any) => st.counterTask)
    const counterId = useSelector((st: any) => st.counterId)
    const token = getCookie("x-access-token");
    

    // // `taskOwner` is a user object of the task's `created_by` user.
    // const taskOwner = famMembers.filter((memb: any) => {
    //     return task.created_by === memb.user_id;
    // })[0];

    /*filter for the assignees' informations to display
        - This is kept incase future updates involve multiple assignees to a task.
    */
    let assignees = famMembers.filter((memb: any) => {
        return task.assignee === memb.user_id;
    });

    const startTrade = (ownerTask: any, ownerId: number, counterPartyTask: any, counterPartyId: number) => {
        let retcode: number;
        console.log("ot", ownerTask)
        console.log("oi", ownerId)
        console.log("ct", counterPartyTask)
        console.log("ci", counterPartyId)

        fetch(`${BASE_URL}/initiate-trade`, {
            method: "POST",
            headers: {
                "Content-type": "application/json;",
                "x-access-token": `${token}`
            },
            body: JSON.stringify({
                task_owner: ownerId,
                owner_task_id: ownerTask,
                task_counterparty: counterPartyId,
                counterparty_task_id: counterPartyTask,
            })
        })
        .then(res => {
            if(res.status == 500) {
                retcode = 500
            } else {
                retcode = 201
            }
            return res.json();
        })
        .then(json => {
            if( retcode === 500) {
                if (json.msg === "Unable to create trade request") {
                    console.log(json)
                } 
            } else if (retcode === 201) {
                console.log(json.msg)
            }
        })
    }


    // avatar dynamic styling: if more than one assignee. (future update)
    let rightPosition = -30
    let zIdx = assignees.length;

    return (
        <div className="TaskCard">
            {/* <TradeForm show={showTradeForm} handleTradeTask={handleTradeTask} handleClose={() => setShowTradeForm(false)} /> */}
            {assignees.map((assignee: any) => {
                // increment and decrement avatar styling variables.
                rightPosition += 30;
                zIdx--;
                return (
                    <div style={{ right: rightPosition, zIndex: zIdx }} key={assignee.user_id} className="TaskCard-img-wrapper">
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip className="TaskCard-tooltip" id={`tooltip-${assignee.user_id}`}>{assignee.first_name}</Tooltip>}
                        >
                            <Image className="TaskCard-img" src={assignee.user_avatar || DEFAULT_PFP} />
                        </OverlayTrigger>
                    </div>
                );
            })}
            <Container>
                {
                    // HTML for task details 
                    <Row className="d-flex align-items-center justify-content-between">
                        <Col sm={6} md={7} onClick={() => setShowTaskDetails(true)}>
                            <Row className="TradeModalTaskCard-header">
                                <h3>{task.task_name}<span className="TradeModalTaskCard-pts">+{task.associated_points}pts</span></h3>
                            </Row>
                            <Row>
                                <p className="TradeModalTaskCard-description">
                                    {task.task_description}
                                </p>
                            </Row>
                        </Col>
                        {!task.completed && <Col sm={6} md={5}>
                                <Button className="TradeModalTaskCard-btn TradeModalTaskCard-complete-btn"  onClick={() => startTrade(task.task_id, task.assignee, counterTask, counterId)}>Select</Button>
                        </Col> } 
                    </Row>
                }
            </Container>
        </div>
    )
}

export default TaskModalTaskCard;