import React, {useEffect} from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logoutUser, epicTime, isShowing, familyCode } from '../actionCreators';
import { getCookie } from '../helpers';
import { BASE_URL } from '../config';
import { useSelector } from 'react-redux';
import CodeTimer from '../CodeTimer/index'
import './DashboardNav.css';

function DashboardNav() {
  const dispatch = useDispatch();
	const history = useHistory();
	const token = getCookie("x-access-token");
	const targetTime = useSelector((state: any) => state.eTime)
	const family_code = useSelector((state: any) => state.familyCode)

	const [codeDisplay, setCodeDisplay] = React.useState("Generate family code!");


  const handleLogout = () => {
    dispatch(logoutUser());
    history.push("/users/auth");
	}
	
	const getFamilyCode = () => {
		let retcode: number;
		if(codeDisplay === "Generate family code!")
		fetch(`${BASE_URL}/generate-family-code`,{
			method: "POST",
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
				dispatch(epicTime())
				dispatch(familyCode(json.family_code))
				setCodeDisplay(json.family_code)
			}
		})
	}
	
	useEffect(() => {
		if(family_code !== ""){
			console.log("hey")
			setCodeDisplay(family_code)
			// setCodeDisplay("Generate family code!")
		} else {
			if(codeDisplay !== "Generate family code!") {
				setCodeDisplay("Generate family code!")
			}
		}
	})

  return (
    <div className="DashboardNav">
      <Nav defaultActiveKey="/tribe" className="flex-column" >
        <NavLink className="mt-2 mb-2"  to={`/tribe/overview`}>Home</NavLink>
        <NavLink className="mt-2 mb-2" to={`/tribe/calender`}>Calender</NavLink>
        <NavLink className="mt-2 mb-2" to={`/tribe/todo`}>To-do</NavLink>
				<NavLink className="mt-2 mb-2" to={`/tribe/completed`}>Completed Tasks</NavLink>
        <NavLink className="mt-2 mb-2" to={`/tribe/store`}>Store</NavLink>
				<Nav.Item className="Family_code" onClick={getFamilyCode}><span>{codeDisplay} <CodeTimer/></span></Nav.Item>
        <li className="DashboardNav-vertical-divider"></li>
        <Button className="DashboardNav-logout-btn mt-2 mb-2" onClick={handleLogout}>Logout</Button>
      </Nav>
    </div>
  );
}

export default DashboardNav;