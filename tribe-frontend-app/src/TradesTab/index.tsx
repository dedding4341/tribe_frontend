import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import PendingTradeTaskCard from '../PendingTradeTaskCard'
import OutGoingTradeTaskCard from '../OutGoingTradeTaskCard'
import Trade from '../Trade'
import { getOutGoingTrades, getPendingTask, gotPendingTask, incomingTradesHash, listOfPendingTask } from '../actionCreators';

interface Task {
    task_id: Number,
    task_name: String,
    associated_points: Number,
    assignee: Array<any>,
    created_by: Number,
    completion_time: String,
}

interface IProps {
    showHistory: Boolean,
}

function TradesTab({ showHistory }: IProps) {
    const pending_tasks = useSelector((st: any) => st.pendingTask)
    const tradesList = useSelector((st: any) => st.listOfTradeTask)
    const outgoing_Trades = useSelector((st: any) => st.outGoingTrades)    
    
    const dispatch = useDispatch();

    useEffect(() => {
        
    }, [pending_tasks, outgoing_Trades]);

    const handleFeedbackIC = (task: any) =>{
        dispatch(getPendingTask())
		dispatch(getOutGoingTrades())
    }

    const handleFeedbackOG = (task: any) =>{
        dispatch(getPendingTask())
		dispatch(getOutGoingTrades())
    }

    return(
        <Container>
            <Col md={4}>
                <h1 className="DashOverview-title">Pending Trades</h1>
            </Col>
            <Row className="mt-3">
                {pending_tasks.length > 0 ? pending_tasks.map((trade: any) => {
                    // console.log(trade)
                    return (<Col key={`${trade[2]}-${trade[2]}`} md={6}>
                    <Trade key={`${trade[2]}-card`} trade={trade} isIncoming={true} feedBack={handleFeedbackIC}/>
                    </Col>)
                }) : <Col md={6}>No tasks to display.</Col>}
            </Row>
            <br/>
            <Col md={4}>
                <h1 className="DashOverview-title">Outgoing Trades</h1>
            </Col>
            <Row className="mt-3">
                {outgoing_Trades.length > 0 ? outgoing_Trades.map((trade: any) => {
                    return (<Col key={`${trade[2]}-${trade[2]}`} md={6}>
                    <Trade key={`${trade.task_id}-card`} trade={trade} isIncoming={false} feedBack={handleFeedbackOG}/>
                    </Col>)
                }) : <Col md={6}>No tasks to display.</Col>}
            </Row>
        </Container>
    )
}

export default TradesTab