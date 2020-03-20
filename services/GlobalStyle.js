// Special StyledComponent that handles global styles
// https://www.styled-components.com/docs/api#createglobalstyle

import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

const GlobalStyle = createGlobalStyle`
  ${normalize()}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,body {
    width:100%;
    height: 100%;
    font-size: 16px;
    min-width: 320px;
    font-family: "Source Sans Pro","Helvetica Neue",Helvetica,sans-serif;
  }
  body {
    text-rendering: optimizeLegibility;
    background-color: ${props => props.theme.colors.bg};
    color: ${props => props.theme.colors.base};
  }

  a {
    color: ${props => props.theme.colors.base};
    transition: color 0.2s ease;
    text-decoration: none;
    &:hover {
      color: ${props => props.theme.colors.base};
      text-decoration: underline;
    }
  }

  label {
    font-size: 15px;
    font-weight: 600;
  }

  input {
    width: 420px;
    padding: 0 11px;
    border-radius: 3px;
    margin-top: 8px;
    font-size: 17px;
    height: 42px;
    border: 0px;
  }

  button {
    background-image: linear-gradient(to right,#e052a0,#f15c41);
    cursor: pointer;
    border-radius: 2px;
    box-shadow: 0 0 20px rgba(0,0,0,.25);
    color: #fff;
    flex: 0 0 auto;
    font-size: 14px;
    font-weight: 600;
    height: 34px;
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    width: 72px;
    border: 0px;
    &:hover {
      background-image: linear-gradient(to right,#3ec7e0,#526bf4);
    }
  }

  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${props => props.theme.colors.primary};

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${props =>
      props.theme.colors.primary}, 0 0 5px ${props =>
  props.theme.colors.primary};
    opacity: 1;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }

  /* Remove these to get rid of the spinner */
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;

    border: solid 2px transparent;
    border-top-color: ${props => props.theme.colors.primary};
    border-left-color: ${props => props.theme.colors.primary};
    border-radius: 50%;

    -webkit-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

`;
export default GlobalStyle;
