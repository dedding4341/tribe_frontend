import { ADD_TASK, COMPLETE_TASK, DELETE_TASK, LOAD_FAMILY_TASKS, LOGIN, LOGIN_BY_TOKEN, LOGOUT, SAVE_FAMILY, SAVE_FAMILY_MEMBERS, SAVE_USER, START_LOADING, STOP_LOADING, UPDATE_TASK, EPIC_TIME, SHOWING_CODE, FAMILY_CODE, NO_FAMILY_CODE, COUNTER_PARTY, PENDING_TASK, OUT_GOING_TRADE, INCOMING_TRADE_HASH, LIST_OF_PENDING_TASK, SET_USER_NAME } from "./actionTypes";

const INITIAL_STATE: any = {
  user: {},
  family: {},
  famMembers: {},
  family_tasks: [],
  loading: true,
  isLoggedIn: false,
  eTime: '00',
  isShowing: false,
  familyCode: "",
  counterTask: {},
  counterId: "",
  pendingTask: [],
  outGoingTrades: [],
  incomingTradesHash: {},
  listOfTradeTask: [],
};

interface Action {
  type: String
  payload: any
}

export default function rootReducer(state = INITIAL_STATE, action: Action) {
  let tasks;
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, user: { ...state.user, ...action.payload } };
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
      tasks = [action.payload.task, ...state.family_tasks]

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
      return { ...state, family_tasks: action.payload.family_tasks }
    case SAVE_FAMILY:
      return { ...state, family: action.payload.family }
    case SAVE_USER:
      return { ...state, user: action.payload.user }
    case SAVE_FAMILY_MEMBERS:
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
      return INITIAL_STATE;
    case EPIC_TIME:
      // let targetTime = Date.now() + (30 * 60000);
      return { ...state, eTime: action.payload.epochTime }
    case SHOWING_CODE:
      return { ...state, isShowing: true }
    case FAMILY_CODE:
      return { ...state, familyCode: action.payload.code }
    case NO_FAMILY_CODE:
      return { ...state, familyCode: "", eTime: "00" }
    case COUNTER_PARTY:
      return { ...state, counterTask: action.payload.counterTask, counterId: action.payload.counterId }
    case PENDING_TASK:
      return { ...state, pendingTask: action.payload.Ptasks }
    case OUT_GOING_TRADE:
      return { ...state, outGoingTrades: action.payload.outgoingTrades }
    case INCOMING_TRADE_HASH:
      return { ...state, incomingTradesHash: action.payload.incoming }
    case LIST_OF_PENDING_TASK:
      return { ...state, listOfTradeTask: action.payload.task }
    default:
      return state;
  }
}