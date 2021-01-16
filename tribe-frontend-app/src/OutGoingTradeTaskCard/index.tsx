import React, { useState } from 'react';
import { Button, Col, Container, Image, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import '../TradeModalTaskCard/TradeModalTaskCard.css';
import { BASE_URL, DEFAULT_PFP } from '../config';
import { useSelector } from 'react-redux';
import { getCookie } from '../helpers';

interface IProps {
    task: any,
    tradeId: Number,
    feedBack: Function
}

/**
 * TaskCard component displays each task.
 * Handler functions to delegate task-related CRUD operations.
 */
function OutGoingTradeTaskCard({ task, tradeId, feedBack } :IProps) {

    const user = useSelector((st: any) => st.user);
    const famMembers = useSelector((st: any) => st.famMembers)
    const isTaskOwner = (task.assignee === user.user_id);
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

    const handleCancel =(sourceId: any, tradeId: any) => {
        feedBack()

        fetch(`${BASE_URL}/cancel-trade`, {
            method: "PATCH",
            body: JSON.stringify({
                trade_id: tradeId,
                source_task_id: sourceId
            }),
            headers: {
                "Content-type": "application/json",
                "x-access-token": `${token}`
            },
            credentials: "include"
        })
        .then(res => res.json)
        .then(json => console.log(json))
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
                        <Col sm={6} md={7} >
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
                            {isTaskOwner ?
                                <Button className="TradeModalTaskCard-btn TradeModalTaskCard-complete-btn"  onClick={() => handleCancel(task.task_id, tradeId)}>Cancel</Button>
                                :<></>
                            }
                        </Col> } 
                    </Row>
                }
            </Container>
        </div>
    )
}

export default OutGoingTradeTaskCard;