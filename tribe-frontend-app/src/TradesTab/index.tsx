import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import PendingTradeTaskCard from '../PendingTradeTaskCard'
import OutGoingTradeTaskCard from '../OutGoingTradeTaskCard'
import { gotOutGoingTrades, getPendingTask, gotPendingTask, incomingTradesHash, listOfPendingTask } from '../actionCreators';

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
    const userId = useSelector((st: any) => st.user.user_id);

    const [incomingTradeHash, setIncomingTradeHash] = useState({})
    const [outGoingTradeHash, setOutGoingTradeHash] = useState({})
    
    let icTradeHash = new Map();
    let ogTradeHash = new Map();
    
    const dispatch = useDispatch();

    useEffect(() => {
        //38-48 Gets the list of task that are being traded to the current user and makes a hash for the trade ID
        let tasks: any = [];

        console.log("not arry of obj", pending_tasks)
        if(pending_tasks.length > 0) {
            pending_tasks.forEach((t: any) => {
                tasks.push(t[0]);
                tasks.push(t[1]);
                icTradeHash.set(t[0].task_id, t[2])
            });
        } else {
            tasks = [];
        }
        setIncomingTradeHash(icTradeHash)

        //52-63 Gets the list of task that are being set out for trade by the current user and makes a hash for the trade ID
        let outTask: any = [];

        console.log(outgoing_Trades)
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
        dispatch(listOfPendingTask(tasks))
        // dispatch(gotOutGoingTrades(outTask));
    }, [pending_tasks, outgoing_Trades]);

    const handleFeedbackIC = (task: any) =>{
        let index = pending_tasks.indexOf(task);
        let newList;
        newList = pending_tasks.filter((t: any) => t !== pending_tasks[index] || t !== pending_tasks[index + 1]);
        // console.log(tasks)
        // console.log(newList)
    }

    const handleFeedbackOG = (task: any) =>{
        let index = outgoing_Trades.indexOf(task);
        let newList;
        newList = outgoing_Trades.filter((t: any) => t !== outgoing_Trades[index] || t !== outgoing_Trades[index + 1]);
        // console.log(outTasks)
        // console.log(newList)
    }

    return(
        <Container>
            <Col md={4}>
                <h1 className="DashOverview-title">Pending Trades</h1>
            </Col>
            <Row className="mt-3">
                {tradesList.length > 0 ? tradesList.map((task: any) => {
                    console.log(task)
                    return (<Col key={`${task.associated_points}-${task.task_id}`} md={6}>
                    <PendingTradeTaskCard key={`${task.task_id}-card`} task={task} hash={incomingTradeHash} feedBack={handleFeedbackIC}/>
                    </Col>)
                }) : <Col md={6}>No tasks to display.</Col>}
            </Row>
            <br/>
            <Col md={4}>
                <h1 className="DashOverview-title">Outgoing Trades</h1>
            </Col>
            <Row className="mt-3">
                {outgoing_Trades.length > 0 ? outgoing_Trades.map((task: any) => {
                    return (<Col key={`${task.associated_points}-${task.task_id}`} md={6}>
                    <OutGoingTradeTaskCard key={`${task.task_id}-card`} task={task} hash = {outGoingTradeHash} feedBack={handleFeedbackOG}/>
                    </Col>)
                }) : <Col md={6}>No tasks to display.</Col>}
            </Row>
        </Container>
    )
}

export default TradesTab