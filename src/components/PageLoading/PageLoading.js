
import React from 'react'
import Preloader from '../Preloader/Preloader'

export default () => {

  return (
    <div className="PageLoader" style={{
      position: 'relative',
      height: '100%'
    }}>
      <Preloader type="parent" />
    </div>
  )
}
