import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { noFamilyCode } from '../actionCreators';


function CodeTimer(){
    const x = useSelector((state: any) => state.eTime);
    const currTime = Date.now();
    const dispatch = useDispatch();
    const family_code = useSelector((state: any) => state.familyCode)
    // const timeDiff = targetTime - currTime;
    // let mins = Math.floor((timeDiff % (1000 * 60 * 60 )) / (1000 * 60));
    // let second = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
    // const [minutes, setMinutes] = React.useState(mins);
    // const [seconds, setSeconds] = React.useState(second);

    //Calculates the amount of time that is left
    const getDiff = () => {
        let targetTime = x;
        const timeDiff = targetTime - currTime;
        
        let timeLeft: any = {};
        if(timeDiff > 0) {
            timeLeft = {
                minutes: Math.floor((timeDiff % (1000 * 60 * 60 )) / (1000 * 60)),
                seconds: Math.floor((timeDiff % (1000 * 60)) / 1000)
            }
        } else {
            if( family_code !== ""){
                dispatch(noFamilyCode())
            }
        }

        return timeLeft;
    }
    const [timeLeft, setTimeLeft] = React.useState(getDiff())

    //this is what updates the time left
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(getDiff());
        }, 1000);
        
        //clears when unmounted
        return() => clearTimeout(timer)
    })
    const timerComponents: any = [];
    Object.keys(timeLeft).forEach((interval => {
        if(!timeLeft[interval]){
            return;
        }
        timerComponents.push(
            <span key={interval}>
                {timeLeft[interval]} {interval}{" "}
            </span>
        );
    }))

    return(
        <div>
            {timerComponents.length ? timerComponents : <span></span>}
        </div>
    );
}

export default CodeTimer;