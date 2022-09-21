import React, { useContext } from "react";
import { context } from "../Board/Board";
import "./soundBtn.scss";

const SoundBtn = ({ text }) => {
  const sound = useContext(context);

  return (
    <div className="soundBtn" id={text} onClick={sound[0]}>
      <h1>Sound{text}</h1>
    </div>
  );
};

export default SoundBtn;
