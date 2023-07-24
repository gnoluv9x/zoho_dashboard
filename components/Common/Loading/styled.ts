import styled from "styled-components";

export const LoaderStyled = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* backdrop-filter: blur(2.5px); */
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 60px;
    width: 160px;
    margin: 0;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .circles {
    position: absolute;
    left: -5px;
    top: 0;
    height: 60px;
    width: 180px;
  }
  .circles span {
    position: absolute;
    top: 25px;
    height: 12px;
    width: 12px;
    border-radius: 12px;
    background-color: #aaaaaa80;
  }
  .circles span.one {
    right: 80px;
  }
  .circles span.two {
    right: 40px;
  }
  .circles span.three {
    right: 0px;
  }
  .circles {
    -webkit-animation: animcircles 0.5s infinite linear;
    animation: animcircles 0.5s infinite linear;
  }
  @-webkit-keyframes animcircles {
    0% {
      -webkit-transform: translate(0px, 0px);
      transform: translate(0px, 0px);
    }
    100% {
      -webkit-transform: translate(-40px, 0px);
      transform: translate(-40px, 0px);
    }
  }
  @keyframes animcircles {
    0% {
      -webkit-transform: translate(0px, 0px);
      transform: translate(0px, 0px);
    }
    100% {
      -webkit-transform: translate(-40px, 0px);
      transform: translate(-40px, 0px);
    }
  }
  .pacman {
    position: absolute;
    left: 0;
    top: 0;
    height: 60px;
    width: 60px;
  }
  .pacman .eye {
    position: absolute;
    top: 10px;
    left: 30px;
    height: 7px;
    width: 7px;
    border-radius: 7px;
    background-color: #fff;
  }
  .pacman span {
    position: absolute;
    top: 0;
    left: 0;
    height: 60px;
    width: 60px;
  }
  .pacman span::before {
    content: "";
    position: absolute;
    left: 0;
    height: 30px;
    width: 60px;
    background-color: blue;
  }
  .pacman .top::before {
    top: 0;
    border-radius: 60px 60px 0px 0px;
  }
  .pacman .bottom::before {
    bottom: 0;
    border-radius: 0px 0px 60px 60px;
  }
  .pacman .left::before {
    bottom: 0;
    height: 60px;
    width: 30px;
    border-radius: 60px 0px 0px 60px;
  }
  .pacman .top {
    -webkit-animation: animtop 0.5s infinite;
    animation: animtop 0.5s infinite;
  }
  @-webkit-keyframes animtop {
    0%,
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
  }
  @keyframes animtop {
    0%,
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
    }
  }
  .pacman .bottom {
    -webkit-animation: animbottom 0.5s infinite;
    animation: animbottom 0.5s infinite;
  }
  @-webkit-keyframes animbottom {
    0%,
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
  @keyframes animbottom {
    0%,
    100% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
`;
