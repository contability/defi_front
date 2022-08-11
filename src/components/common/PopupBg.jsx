import { useDispatch } from "react-redux";
import styled from "styled-components";

export default function PopupBg({ bg, blur, off }) {
  const dispatch = useDispatch();

  function onClickBg() {
    if (off) off();
  }

  function getOpt() {
    let className = "";

    if (bg) className += " bg";
    if (blur) className += " blur";

    return className;
  }

  return <PopupBgBox onClick={onClickBg} className={getOpt()} />;
}

const PopupBgBox = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  //cursor: pointer;
  z-index: 5;

  &.bg {
    background: rgba(0, 0, 0, 0.4);
  }

  &.blur {
    -webkit-backdrop-filter: blur(50px);
    backdrop-filter: blur(7px);
  }
`;
