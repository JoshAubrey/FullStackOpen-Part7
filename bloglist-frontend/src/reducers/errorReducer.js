const errorReducer = (state = false, action) => {
    switch (action.type) {
        case 'ERROR':
            return true
        case 'CLEAR_ERROR':
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
      type: 'CLEAR_ERROR',
    }
  }
  
  export default errorReducer