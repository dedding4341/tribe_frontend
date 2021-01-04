import { ADD_TASK, DELETE_TASK, LOAD_FAMILY_TASKS, LOGIN, LOGIN_BY_TOKEN, LOGOUT, SAVE_FAMILY, SAVE_FAMILY_MEMBERS, SAVE_USER, START_LOADING, STOP_LOADING } from "./actionTypes";

const INITIAL_STATE: any = {
  user: {},
  family: {},
  famMembers: {},
  family_tasks: [],
  loading: true,
  isLoggedIn: false,
};

interface Action {
  type: String
  payload: any
}

export default function rootReducer(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case ADD_TASK:
      let tasks = [{ ...action.payload.task, created_by: state.user.user_id, created_at: new Date().getUTCDate() }, ...state.family_tasks]
      return { ...state, family_tasks: tasks }
    case DELETE_TASK:
      let filteredTasks = state.family_tasks.filter((task: any) => {
        return task.task_id !== action.payload.task_id;
      });
      return { ...state, family_tasks: filteredTasks };
    case LOAD_FAMILY_TASKS:
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
    default:
      return state;
  }
}