import { ADD_TASK, DELETE_TASK, LOAD_FAMILY_TASKS, LOGIN, LOGIN_BY_TOKEN, LOGOUT, SAVE_FAMILY, SAVE_FAMILY_MEMBERS, SAVE_USER, START_LOADING, STOP_LOADING } from "./actionTypes";
import { BASE_URL } from "./config";
import { getCookie } from "./helpers";

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
    dispatch(gotFamilyTasks(resData.family_tasks))
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
      console.log("deletion completed");
      dispatch(deleteTask(task_id));
    }
  }
}

export function postTaskToAPI(task: any) {
  return async function (dispatch: any) {
    const token = getCookie("x-access-token");
    await fetch(`${BASE_URL}/create-task`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json",
        "x-access-token": `${token}`
      },
      credentials: "include"
    });
    dispatch(addTask(task));
  }
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
    dispatch({ type: LOGOUT })
  }
}

export function loginByToken() {
  return { type: LOGIN_BY_TOKEN }
}

function startLoading() {
  return { type: START_LOADING }
}

function stopLoading() {
  return { type: STOP_LOADING }
}