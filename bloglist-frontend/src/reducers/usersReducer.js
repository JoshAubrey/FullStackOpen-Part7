import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch(action.type) {
    // case 'NEW_USER': {
    //   return [...state, action.data]
    // }
    // case 'DELETE_USER': {
    //   const id = action.data
    //   return state.filter(b => b.id !== id)
    // }
    case 'INIT_USERS': {
      return action.data
    }
    default: return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users,
    })
  }
}

export default usersReducer