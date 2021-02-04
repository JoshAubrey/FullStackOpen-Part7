import { setError, clearError } from './errorReducer'

const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.notification
        case 'CLEAR_NOTIF':
            return ''
        default:
            return state
    }
  }

let timeoutID 

export const setNotification = (notification, displayTime, error) => {
  return async dispatch => {
    if (error === true) dispatch(setError())
    dispatch({
      type: 'NOTIFICATION',
      notification,
    })
    clearTimeout(timeoutID)
    timeoutID = await setTimeout(() => {
      if (error === true) dispatch(clearError())
      dispatch({
        type: 'CLEAR_NOTIF'
      })
    }, displayTime*1000)
  }
}

  // export const setNotification = (notification) => {
  //   return {
  //     type: 'NOTIFICATION',
  //     notification,
  //   }
  // }

  // export const clearNotification = () => {
  //   return {
  //     type: 'CLEAR',
  //   }
  // }
  
  export default notificationReducer