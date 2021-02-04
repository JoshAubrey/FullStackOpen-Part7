const currentUserReducer = (state = null, action) => {
    switch (action.type) {
        case 'CURRENT_USER':
            return action.currentUser
        case 'CLEAR_CURRENT_USER':
            return null
        default:
            return state
    }
  }

  export const setCurrentUser = (currentUser) => {
    return {
      type: 'CURRENT_USER',
      currentUser,
    }
  }

  export const clearCurrentUser = () => {
    return {
      type: 'CLEAR_CURRENT_USER',
    }
  }
  
  export default currentUserReducer