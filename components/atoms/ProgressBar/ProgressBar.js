import React from 'react';

const ProgressBar = ({ size = 'sm', progress = 50 }) => {
  return (
    <div className={`progress-bar progress-bar--${size}`}>
      <div
        className="progress"
        style={{
          width: `${progress}%`,
        }}
      />
      <style jsx>{`
      .progress-bar {
          width: 100%;
          background: var(--base60);
          border-radius: 5px;
          overflow: hidden;
          height: 5px;

          &--sm {
              height: 5px;
          }

          &--md {
              height: 10px;
          }

          &--lg {
              height: 20px;
          }

          .progress {
              background: var(--base);
              height: 100%;
              transition: width 0.2s ease 0s;
          }
      }
      `}</style>
    </div>
  )
}

export default ProgressBar;