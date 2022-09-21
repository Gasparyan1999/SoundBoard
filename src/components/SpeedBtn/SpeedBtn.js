import React, { useRef } from "react";
import "./speedBtn.scss";

const SpeedBtn = ({ num, audio }) => {
  const btnRef = useRef(null);
  const speedClick = () => {
    audio.playbackRate = +btnRef.current.id;
  };
  return (
    <button id={num} ref={btnRef} onClick={speedClick}>
      X{num}
    </button>
  );
};

export default SpeedBtn;
