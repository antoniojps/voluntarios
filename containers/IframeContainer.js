import React from 'react'

const IframeContainer = ({ children }) => {
    return (
        <div
            className='voluntarios__iframe'
        >
            {children}
            <style jsx>{`
            .voluntarios__iframe {
            padding: 5px
            }
      `}</style>
        </div>
    )
}

export default IframeContainer