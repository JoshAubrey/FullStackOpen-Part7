const currentUserReducer = (state = null, action) => {
    switch (action.type) {
        case 'USER':
            return action.currentUser
        case 'CLEAR':
            return null
        default:
            return state
    }
  }

  export const setCurrentUser = (currentUser) => {
    return {
      type: 'USER',
      currentUser,
    }
  }

  export const clearCurrentUser = () => {
    return {
      type: 'CLEAR',
    }
  }
  
  export default currentUserReducer