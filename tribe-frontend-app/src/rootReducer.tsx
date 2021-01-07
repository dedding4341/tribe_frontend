import { ADD_TASK, COMPLETE_TASK, DELETE_TASK, LOAD_FAMILY_TASKS, LOGIN, LOGIN_BY_TOKEN, LOGOUT, SAVE_FAMILY, SAVE_FAMILY_MEMBERS, SAVE_USER, START_LOADING, STOP_LOADING, UPDATE_TASK, EPIC_TIME, SHOWING_CODE, FAMILY_CODE, NO_FAMILY_CODE } from "./actionTypes";

const INITIAL_STATE: any = {
  user: {},
  family: {},
  famMembers: {},
  family_tasks: [],
  loading: true,
  isLoggedIn: false,
  eTime: '00',
  isShowing: false,
  familyCode: ""
};

interface Action {
  type: String
  payload: any
}

export default function rootReducer(state = INITIAL_STATE, action: Action) {
  let tasks;
  switch (action.type) {
    case COMPLETE_TASK:
      // find the task and update the completed and completed time key.
      tasks = state.family_tasks.map((task: any) => {
        if (task.task_id === action.payload.task_id) {
          task.completed = true;
          task.completed_time = new Date().getUTCDate();
        }
        return task;
      });
      return { ...state, family_tasks: tasks };
    case ADD_TASK:
      tasks = [{ ...action.payload.task, created_by: state.user.user_id, created_at: new Date().getUTCDate() }, ...state.family_tasks]
      return { ...state, family_tasks: tasks }
    case DELETE_TASK:
      let filteredTasks = state.family_tasks.filter((task: any) => {
        return task.task_id !== action.payload.task_id;
      });
      return { ...state, family_tasks: filteredTasks };
    case UPDATE_TASK:
      let updatedTasks = state.family_tasks.map((task: any) => {
        if (task.task_id === action.payload.task.task_id) {
          return action.payload.task
        }
        return task;
      });
      return { ...state, family_tasks: updatedTasks };
    case LOAD_FAMILY_TASKS:
      console.log("saving the tasks...,", action.payload.family_tasks)
      return { ...state, family_tasks: action.payload.family_tasks }
    case SAVE_FAMILY:
      console.log("saving the family...,", action.payload.family)
      return { ...state, family: action.payload.family }
    case SAVE_USER:
      console.log("saving the user...,", action.payload.user)
      return { ...state, user: action.payload.user }
    case SAVE_FAMILY_MEMBERS:
      console.log("saving the family membs...,", action.payload.familyMembers)
      return { ...state, famMembers: action.payload.familyMembers }
    case STOP_LOADING:
      return { ...state, loading: false }
    case START_LOADING:
      return { ...state, loading: true }
    case LOGIN_BY_TOKEN:
      return { ...state, isLoggedIn: true };
    case LOGIN:
      return { ...INITIAL_STATE, user: action.payload.user, isLoggedIn: true }
    case LOGOUT:
      console.log("logging out in the rootReducer...")
      return INITIAL_STATE;
    case EPIC_TIME:
      let targetTime = Date.now() + (30 * 1000);
      console.log(targetTime)
      return {...state, eTime: targetTime}
    case SHOWING_CODE:
      return {...state, isShowing: true}
    case FAMILY_CODE:
      return {...state, familyCode: action.payload.code}
    case NO_FAMILY_CODE:
      return {...state, familyCode: action.payload.code}
    default:
      return state;
  }
}