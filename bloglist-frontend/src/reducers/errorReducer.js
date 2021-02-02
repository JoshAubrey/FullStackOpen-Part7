const errorReducer = (state = false, action) => {
    switch (action.type) {
        case 'ERROR':
            return true
        case 'CLEAR':
            return false
        default:
            return state
    }
  }

  export const setError = () => {
    return {
      type: 'ERROR',
    }
  }

  export const clearError = () => {
    return {
      type: 'CLEAR',
    }
  }
  
  export default errorReducer