import { createGlobalStyle } from "styled-components";
import mainBg from "../../img/bg/mainBg.png";

const GlobalStyle = createGlobalStyle`

  body{
    &::-webkit-scrollbar {
      display: none;
    }
  }

  *{
    padding:0;
    margin:0;
    font-family: "Poppins", sans-serif;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
    border: none;
    user-select: none;
  }
  
  body{

  }
  
  u{
    text-decoration: underline;
  }
  
  *:link,
  *:visited{
    color:unset;
  }

  *:disabled {
    cursor: not-allowed;
  }
  
  *::-webkit-scrollbar {
    width: 0;
  }
  
  *:focus{
    outline:none;
  }
  
  input{
    min-width: 0;
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    background: unset;
    outline: none;
    user-select: auto;

    &::placeholder{
      color: rgba(255, 255, 255, 0.14);
    }
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  textarea{
    &::placeholder{
      color: #b2b2b2;
    }
  }


  label,
  summary{
    cursor: pointer;
  }

  button{
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    background: none;
    cursor: pointer;
  }

  textarea{
    resize: none;
    user-select:auto;
  }

  &#BroadBox {
    background: #373737;
  }

  .nospace{
    width: 0;
    height: 0;
    position: absolute;
  }

  .defaultPopup {
    width: 500px;
    padding: 40px;
    background: #fff;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 15px;
    top: 50%;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    z-index: 6;
  }

  .posBox{
    position: relative;
  }


  //custom 
  strong{
    font-weight: 600;
  }

  .withBg{
    height: 100vh;
    background: center/cover no-repeat url(${mainBg}),linear-gradient(108.01deg, #201d1c 32.97%, #57303e 99.39%);
  }

  
  .innerBox{
    z-index: 1;
  }

  .rangeTrack{
    display: flex;
    width: 100%;
    height: 18px;
    position: relative;

    .rangeBar{
      align-self: center;
      width: 100%;
      height: 8px;
      border-radius: 100px;

      .rangeThumb{
        height: 18px;
        width: 18px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        cursor: grab;
        user-select: none;
        touch-action: none;
      }
    }

  }


`;

export default GlobalStyle;
