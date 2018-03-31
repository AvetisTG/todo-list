import axios from 'axios'

import {
  FETCHING_TASKS,
  FETCHING_TASKS_DONE,
  FETCHING_TASKS_ERROR,
  ADDING_NEW_TASK
} from "./consts"

export function fetchTasks(page = 1) {
  return function (dispatch) {
    dispatch({type: FETCHING_TASKS})
    axios.get('https://uxcandy.com/~shapoval/test-task-backend/?developer=Avetis&page=' + page)
      .then((response) => {
        const tasks = response.data.message.tasks
        const totalCount = response.data.message.total_task_count
        dispatch({type: FETCHING_TASKS_DONE, payload: tasks, totalCount})
      })
      .catch(error => {
        dispatch({type: FETCHING_TASKS_ERROR, payload: error.message})
      })

  }
}

export function addNewTask(username, email, text, file) {
  return function (dispatch) {
    dispatch({type: ADDING_NEW_TASK})
    let form = new FormData()
    form.append('username', username)
    form.append('email', email)
    form.append('text', text)
    form.append('image', file)

    axios.post('https://uxcandy.com/~shapoval/test-task-backend/create?developer=Avetis', form)
      .then(response => {
        console.log(response, 'response add new task')
      })
      .catch(error => {
        console.log(error, 'response add new task')
      })

  }
}

