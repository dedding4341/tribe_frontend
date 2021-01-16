import React, {useEffect} from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logoutUser, epochTime, isShowing, familyCode, getOutGoingTrades } from '../actionCreators';
import { getCookie } from '../helpers';
import { BASE_URL } from '../config';
import { useSelector } from 'react-redux';
import CodeTimer from '../CodeTimer/index'
import './DashboardNav.css';
import { getPendingTask } from '../actionCreators';

function DashboardNav() {
  const dispatch = useDispatch();
	const history = useHistory();
	const token = getCookie("x-access-token");
	const targetTime = useSelector((state: any) => state.eTime)
	const family_code = useSelector((state: any) => state.familyCode)
	const family = useSelector((state: any) => state.family)

	const [codeDisplay, setCodeDisplay] = React.useState("Generate Family Code");


  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/users/auth");
	}
	
	const getFamilyCode = () => {
		let retcode: number;
		if(codeDisplay === "Generate Family Code")
		fetch(`${BASE_URL}/generate-family-code`,{
			method: "POST",
			body: JSON.stringify({
				family_id: family.family_id,
			}),
			headers: {
				"Content-type": "application/json",
				"x-access-token": `${token}`
			}
		})
		.then(res => {
			if(res.status === 500){
				retcode = 500
			} else {
				retcode = 201
			}
			return res.json();
		})
		.then(json => {
			if(retcode === 500){
				if(json.msg === "Error occurred while creating family code"){
					setCodeDisplay("Try Again.")
				}
			} else if (retcode === 201){
				// dispatch(epochTime(new Date(json.family_code.expire).getTime()))
				dispatch(epochTime(json.family_code.ttl))
				dispatch(familyCode(json.family_code.family_code))
				setCodeDisplay(json.family_code.family_code)
			}
		})
	}

	const getPendingTrades = () => {
		dispatch(getPendingTask())
		dispatch(getOutGoingTrades())
	}
	
	useEffect(() => {
		if(family_code !== ""){
			setCodeDisplay(family_code)
			// setCodeDisplay("Generate Family Code!")
		} else {
			if(codeDisplay !== "Generate Family Code") {
				setCodeDisplay("Generate Family Code")
			}
		}
	})

  return (
    <div className="DashboardNav">
      <Nav defaultActiveKey="/tribe" className="flex-column" >
        <NavLink className="mt-2 mb-2"  to={`/tribe/overview`}>Home</NavLink>
        {/* <NavLink className="mt-2 mb-2" to={`/tribe/calender`}>Calender</NavLink> */}
        <NavLink className="mt-2 mb-2" to={`/tribe/todo`}>To-do</NavLink>
		<NavLink className="mt-2 mb-2" to={`/tribe/completed`}>Completed Tasks</NavLink>
		<NavLink className="mt-2 mb-2" to={`/tribe/trades`} onClick={getPendingTrades}>Trades</NavLink>
        {/* <NavLink className="mt-2 mb-2" to={`/tribe/store`}>Store</NavLink> */}
		<Nav.Item className="Family_code" onClick={getFamilyCode}><span>{codeDisplay} <CodeTimer/></span></Nav.Item>
        <li className="DashboardNav-vertical-divider"></li>
        <Button className="DashboardNav-logout-btn mt-2 mb-2" onClick={handleLogout}>Logout</Button>
      </Nav>
    </div>
  );
}

export default DashboardNav;