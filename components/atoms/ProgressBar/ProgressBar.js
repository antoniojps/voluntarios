import React from 'react';
import './ProgressBar.module.scss';

const ProgressBar = ({ size = 'sm', progress = 50 }) => {
  return (
    <div className={`progress-bar progress-bar--${size}`}>
      <div
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  )
}

export default ProgressBar;