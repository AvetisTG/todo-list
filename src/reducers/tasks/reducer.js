import {FETCHING_TASKS,
  FETCHING_TASKS_DONE,
  FETCHING_TASKS_ERROR} from "./consts"

const initialState = {
  tasks: [],
  fetching: false,
  error: null,
  totalCount: 0
}

export default function reducer (state=initialState, action) {
  switch (action.type) {
    case FETCHING_TASKS: {
      return {...state, fetching: true}
    }
    case FETCHING_TASKS_DONE: {
      return {...state, fetching: false, tasks: action.payload, totalCount: action.totalCount}
    }
    case FETCHING_TASKS_ERROR: {
      return {...state, fetching: false, error: action.payload}
    }
    default: {
      return {...state}
    }
  }
}