import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import PendingTradeTaskCard from '../PendingTradeTaskCard'
import OutGoingTradeTaskCard from '../OutGoingTradeTaskCard'
import { getPendingTask, incomingTradesHash } from '../actionCreators';

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
    const outgoing_Trades = useSelector((st: any) => st.outGoingTrades)
    const [tasks, setTasks] = useState(pending_tasks);
    const [outTasks, setOutTasks] =  useState(outgoing_Trades);
    const userId = useSelector((st: any) => st.user.user_id);
    const [incomingTradeHash, setIncomingTradeHash] = useState({})
    const [outGoingTradeHash, setOutGoingTradeHash] = useState({})

    let icTradeHash = new Map();
    let ogTradeHash = new Map();

    
    const dispatch = useDispatch();

    useEffect(() => {
        let tasks: any = [];
        
        if(pending_tasks.length > 0) {
            pending_tasks.forEach((t: any) => {
                tasks.push(t[0]);
                tasks.push(t[1]);
                icTradeHash.set(t[1].task_id, t[2])
            });
        } else {
            tasks = [];
        }
        console.log(tasks)
        setIncomingTradeHash(icTradeHash)
        let outTask: any = [];

        if(outgoing_Trades.length > 0){
            outgoing_Trades.map((t: any) => {
                outTask.push(t[0]);
                outTask.push(t[1]);
                ogTradeHash.set(t[0].task_id, t[2])
            })
        } else {
            outTask = [];
        }

        setOutGoingTradeHash(ogTradeHash)
        setTasks(tasks);  
        setOutTasks(outTask);
    }, [pending_tasks, outgoing_Trades]);

    return(
        <Container>
            <Col md={4}>
                <h1 className="DashOverview-title">Pending Trades</h1>
            </Col>
            <Row className="mt-3">
                {console.log("this is it", incomingTradeHash)}
                {tasks.length > 0 ? tasks.map((task: any) => {
                    return (<Col key={`${task.associated_points}-${task.task_id}`} md={6}>
                    <PendingTradeTaskCard key={`${task.task_id}-card`} task={task} hash={incomingTradeHash}/>
                    </Col>)
                }) : <Col md={6}>No tasks to display.</Col>}
            </Row>
            <br/>
            <Col md={4}>
                <h1 className="DashOverview-title">Outgoing Trades</h1>
            </Col>
            <Row className="mt-3">
                {outTasks.length > 0 ? outTasks.map((task: any) => {
                    return (<Col key={`${task.associated_points}-${task.task_id}`} md={6}>
                    <OutGoingTradeTaskCard key={`${task.task_id}-card`} task={task} hash = {outGoingTradeHash}/>
                    </Col>)
                }) : <Col md={6}>No tasks to display.</Col>}
            </Row>
        </Container>
    )
}

export default TradesTab