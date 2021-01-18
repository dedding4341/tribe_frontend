import { ADD_TASK, COMPLETE_TASK, DELETE_TASK, LOAD_FAMILY_TASKS, LOGIN, LOGIN_BY_TOKEN, LOGOUT, SAVE_FAMILY, SAVE_FAMILY_MEMBERS, SAVE_USER, START_LOADING, STOP_LOADING, UPDATE_TASK, EPIC_TIME, SHOWING_CODE, FAMILY_CODE, NO_FAMILY_CODE, COUNTER_PARTY, PENDING_TASK, OUT_GOING_TRADE, INCOMING_TRADE_HASH, LIST_OF_PENDING_TASK, SET_USER_NAME, SET_IS_FETCHED, SET_TOAST, DELETE_TOAST } from "./actionTypes";
import { BASE_URL } from "./config";
import { getCookie } from "./helpers";
import moment from "moment";

export function getUserFromAPI() {
  return async function (dispatch: any) {
    const token = getCookie("x-access-token");
    const res = await fetch(`${BASE_URL}/get-user`, {
      method: 'GET',
      headers: {
        "x-access-token": token
      },
      credentials: "include"
    });
    const resData = await res.json()
    dispatch(gotUser(resData.user));
  }
}

export function getFamilyFromAPI() {
  return async function (dispatch: any) {
    const token = getCookie("x-access-token");
    const res = await fetch(`${BASE_URL}/get-family-info`, {
      method: 'GET',
      headers: {
        "x-access-token": token
      },
      credentials: "include"
    });
    const resData = await res.json();
    dispatch(gotFamily(resData.family));
  }
}

export function getFamilyMembersFromAPI() {
  return async function (dispatch: any) {
    const token = getCookie("x-access-token");

    const res = await fetch(`${BASE_URL}/family`, {
      method: 'GET',
      headers: {
        "x-access-token": token
      },
      credentials: "include"
    });
    const resData = await res.json();
    dispatch(gotFamilyMembers(resData.users));
  }
}

export function getFamilyTasksFromAPI() {
  return async function (dispatch: any) {
    dispatch(startLoading());
    const token = getCookie("x-access-token");
    const getFamTaskUrl = `${BASE_URL}/tasks/family`;
    const res = await fetch(getFamTaskUrl, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "x-access-token": `${token}`,
      },
      credentials: "include"
    });
    const resData = await res.json();
    dispatch(gotFamilyTasks(resData.family_tasks));
    dispatch(stopLoading());
  }
}

export function deleteTaskFromAPI(task_id: Number) {
  return async function (dispatch: any) {
    const token = getCookie("x-access-token");

    const res = await fetch(`${BASE_URL}/delete-task`, {
      method: "PATCH",
      body: JSON.stringify({ task_id }),
      headers: {
        "Content-type": "application/json",
        "x-access-token": `${token}`
      },
      credentials: "include"
    });
    if (res.status === 200) {
      dispatch(deleteTask(task_id));
    }
  }
}

export function postTaskToAPI(task: any) {
  return async function (dispatch: any) {
    const token = getCookie("x-access-token");
    const resp = await fetch(`${BASE_URL}/create-task`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json",
        "x-access-token": `${token}`
      },
      credentials: "include"
    });
    const respData = await resp.json();
    if (resp.status === 201) {
      dispatch(addTask(respData.task));
    }
  }
}

export function updateTaskToAPI(task: any) {
  return async function (dispatch: any) {
    const token = getCookie("x-access-token");
    await fetch(`${BASE_URL}/edit-task`, {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json",
        "x-access-token": `${token}`
      },
      credentials: "include"
    });
    dispatch(updateTask(task));
  }
}

export function completeTaskFromAPI(task_id: Number) {
  return async function (dispatch: any) {
    const token = getCookie("x-access-token");
    const res = await fetch(`${BASE_URL}/complete-task`, {
      method: "PATCH",
      body: JSON.stringify({ task_id }),
      headers: {
        "Content-type": "application/json",
        "x-access-token": `${token}`
      },
      credentials: "include"
    });
    if (res.status === 200) {
      dispatch(completeTask(task_id));

      const randomId = Math.floor(Math.random() * (9999 - 1) + 1);
      dispatch(setToast("Successfully finished a task!", "Tribe Task", moment().fromNow(), randomId));
    }
  }
}

export function getPendingTask() {
  return async function (dispatch: any) {
    dispatch(startLoading());
    const token = getCookie("x-access-token");
    const res = await fetch(`${BASE_URL}/incoming-trades`, {
      method: "GET",
      headers: {
        "x-access-token": token
      },
      credentials: "include"
    });
    const resData = await res.json()
    dispatch(gotPendingTask(resData.incoming_trades));
  }
}

export function getOutGoingTrades() {
  return async function (dispatch: any) {
    const token = getCookie("x-access-token");
    const res = await fetch(`${BASE_URL}/outgoing-trades`, {
      method: "GET",
      headers: {
        "x-access-token": token
      },
      credentials: "include"
    });
    const resData = await res.json()
    dispatch(gotOutGoingTrades(resData.outgoing_trades));
    dispatch(stopLoading());
  }
}

function setToast(msg: string, title: string, time: string, toast_id: number) {
  return { type: SET_TOAST, payload: { toast: { msg, title, time, toast_id } } };
}

export function deleteToast(toast_id: number) {
  return { type: DELETE_TOAST, payload: { toast_id } }
}

function completeTask(task_id: Number) {
  return { type: COMPLETE_TASK, payload: { task_id } }
}

function updateTask(task: any) {
  return { type: UPDATE_TASK, payload: { task } };
}

function addTask(task: any) {
  return { type: ADD_TASK, payload: { task } };
}

function deleteTask(task_id: Number) {
  return { type: DELETE_TASK, payload: { task_id } }
}

function gotFamilyTasks(family_tasks: any) {
  return { type: LOAD_FAMILY_TASKS, payload: { family_tasks } }
}

function gotUser(user: any) {
  return { type: SAVE_USER, payload: { user } };
}

function gotFamily(family: any) {
  return { type: SAVE_FAMILY, payload: { family } };
}

function gotFamilyMembers(familyMembers: any) {
  return { type: SAVE_FAMILY_MEMBERS, payload: { familyMembers } };
}

export function loginUser(user: any) {
  return { type: LOGIN, payload: { user } };
}

export function logoutUser() {
  return function (dispatch: any) {
    document.cookie = "x-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "x-access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/tasks;";
    dispatch({ type: LOGOUT })
  }
}

export function loginByToken() {
  return { type: LOGIN_BY_TOKEN }
}

export function startLoading() {
  return { type: START_LOADING }
}

export function stopLoading() {
  return { type: STOP_LOADING }
}

export function epochTime(epochTime: number) {
  return { type: EPIC_TIME, payload: { epochTime } }
}

export function isShowing() {
  return { type: SHOWING_CODE }
}

export function gotUserFirstLastName(first_name: string, last_name: string) {
  return { type: SET_USER_NAME, payload: { first_name, last_name } }
}

export function familyCode(code: string) {
  return { type: FAMILY_CODE, payload: { code } }
}

export function noFamilyCode() {
  return { type: NO_FAMILY_CODE }
}

export function counterParty(counterTask: any, counterId: number) {
  return { type: COUNTER_PARTY, payload: { counterTask, counterId } }
}

export function gotPendingTask(Ptasks: any) {
  return { type: PENDING_TASK, payload: { Ptasks } }
}
export function gotOutGoingTrades(outgoingTrades: any) {
  return { type: OUT_GOING_TRADE, payload: { outgoingTrades } }
}

export function incomingTradesHash(incoming: any) {
  return { type: INCOMING_TRADE_HASH, payload: { incoming } }
}

export function listOfPendingTask(task: any) {
  return { type: LIST_OF_PENDING_TASK, payload: { task } }
}

export function setIsFetched(isFetched: any) {
  return { type: SET_IS_FETCHED, payload: { isFetched } }
}