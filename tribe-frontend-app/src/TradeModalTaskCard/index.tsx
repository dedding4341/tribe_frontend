import React, { useState } from 'react';
import { Button, Col, Container, Image, OverlayTrigger, Row, Tooltip, Modal, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import moment from "moment";
import './TradeModalTaskCard.css';
import { BASE_URL, DEFAULT_PFP } from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { getFamilyTasksFromAPI } from '../actionCreators';
import { getCookie } from '../helpers';

interface IProps {
    task: any,
    onHide: Function,
    showTradeDuplicate: Function,
}

/**
 * TradeModalTaskCard component displays each task the current user can trade.
 * Handler functions to delegate task-related CRUD operations.
 */
function TaskModalTaskCard({ task, onHide, showTradeDuplicate} :IProps) {

    const user = useSelector((st: any) => st.user);
    const famMembers = useSelector((st: any) => st.famMembers)
    const counterTask = useSelector((st: any) => st.counterTask)
    const counterId = useSelector((st: any) => st.counterId)
    const isTaskOwner = (task.assignee === user.user_id);

    const token = getCookie("x-access-token");
    const dispatch = useDispatch()
    

    // `taskOwner` is a user object of the task's `created_by` user.
    const taskOwner = famMembers.filter((memb: any) => {
        return task.created_by === memb.user_id;
    })[0];

    /*filter for the assignees' informations to display
        - This is kept incase future updates involve multiple assignees to a task.
    */
    let assignees = famMembers.filter((memb: any) => {
        return task.assignee === memb.user_id;
    });

    const startTrade = (ownerTask: any, ownerId: number, counterPartyTask: any, counterPartyId: number) => {
        let retcode: number;

        onHide()
        fetch(`${BASE_URL}/initiate-trade`, {
            method: "POST",
            headers: {
                "Content-type": "application/json;",
                "x-access-token": `${token}`
            },
            body: JSON.stringify({
                task_counterparty: counterPartyId,
                owner_task_id: ownerTask,
                counterparty_task_id: counterPartyTask,
            })
        })
        .then(res => {
            if(res.status == 500) {
                retcode = 500
            } else if(res.status == 409){
                retcode = 409
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
            } else if(retcode === 409){
                if(json.msg === "Unable to create trade request - duplicate exists"){
                    showTradeDuplicate()
                }

            } else if (retcode === 201) {
                console.log(json.msg)
                dispatch(getFamilyTasksFromAPI())
            }
        })
        
    }


    // avatar dynamic styling: if more than one assignee. (future update)
    let rightPosition = -30
    let zIdx = assignees.length;

    return (
        <div className="TaskCard">
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
                        <Col sm={6} md={7}>
                            <Row className="TradeModalTaskCard-header">
                                <h3>{task.task_name}<span className="TradeModalTaskCard-pts">+{task.associated_points}pts</span></h3>
                            </Row>
                            <Row>
                                <p className="TradeModalTaskCard-description">
                                    {task.task_description}
                                </p>
                            </Row>
                            <Row>
                                <div className="TaskCard-deadline text-left">
                                    {task.completed ? `completed ${moment(new Date(task.completion_time).toString()).calendar()}` : `posted ${moment(new Date(task.created_at).toString()).calendar()} by ${taskOwner.first_name}`}
                                </div>
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