import React from 'react'
import './TaskCard.css'

function TaskCard() {
    return(
        <div className="taskCard">
            <div className="cardContent">
                <span className="NameAndPoint">
                    <h3>Task name</h3>
                    <h5>number of points</h5>
                </span>
                <div className="taskDetails">
                    Task details here
                </div>
            </div>
            <div className="trade-complete-button">
                Trade
            </div>
        </div>
    )
}

export default TaskCard