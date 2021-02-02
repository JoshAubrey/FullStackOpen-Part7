import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification)
  const error = useSelector(state => state.error)

  if (notification === '') return <div></div>
  else if (error === true ) {
    return (
      <div className="error">
        {notification}
      </div>
    )
  }

  return (
    <div className="notify">
      {notification}
    </div>
  )
}

export default Notification