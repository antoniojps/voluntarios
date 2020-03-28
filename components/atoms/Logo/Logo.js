import React from 'react'

const getWidth = (originalWidth, originalHeight, currentHeight) => Math.round(currentHeight * (originalWidth / originalHeight));

const Logo = ({ height = 32 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={getWidth(28, 32, height)}
      height={height}
      viewBox="0 0 28 32"
    >
      <title>Letra V, na zona inferior encontram-se duas mãos apertadas</title>
      <g stroke="#FFF" strokeWidth="0.5">
        <path d="M26.87 6.184l-8.58 19.114H9.759L1.39 6.656c-1.195-2.66.88-5.608 3.95-5.608h0c1.736 0 3.309.992 3.966 2.508l5.053 11.659 5.276-11.9c.61-1.372 2.037-2.267 3.619-2.267h0c2.809 0 4.708 2.7 3.614 5.136z"></path>
        <path d="M14.78 24.253l1.662 4.052c.239.584.964.838 1.631.567h0c.66-.271 1.003-.965.764-1.55l-1.662-4.05"></path>
        <path d="M14.78 24.253l1.662 4.052c.239.584-.102 1.277-.764 1.543h0c-.661.271-1.391.018-1.63-.567l-1.662-4.051m-.003.005l1.662 4.052c.239.584-.103 1.278-.764 1.549h0c-.662.271-1.392.017-1.631-.567l-1.663-4.052m6.876-10.306l-1.376 3.467a2.612 2.612 0 01-3.376 1.492h0l2.35-5.915"></path>
        <g transform="translate(6.788 20.871)">
          <rect
            width="2.588"
            height="4.462"
            x="1.287"
            y="0.109"
            rx="1.158"
            transform="rotate(59.13 2.58 2.34)"
          ></rect>
          <rect
            width="2.588"
            height="4.462"
            x="2.61"
            y="2.333"
            rx="1.158"
            transform="rotate(59.13 3.904 4.565)"
          ></rect>
          <rect
            width="2.588"
            height="4.462"
            x="3.868"
            y="4.597"
            rx="1.158"
            transform="rotate(59.13 5.162 6.828)"
          ></rect>
        </g>
      </g>
    </svg>
  )
}

export default Logo
