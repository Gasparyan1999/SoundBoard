import React, { useContext, useRef } from "react";
import { context } from "../Board/Board";
import "./soundBtn.scss";

const SoundBtn = ({ text }) => {
  const [
      audio,
      setAudio,
      playingMelodyId,
      setPlayingMelodyId,
      playingController,
      setPlayingController,
      soundArr,
  ] = useContext(context);

  const refBtn = useRef(null);

  const SoundStartClick = () => {

    if (!audio.duration) {
      setAudio(new Audio(soundArr[refBtn.current.id- 1]));
      setPlayingMelodyId(refBtn.current.id);
      setPlayingController(!playingController);
    } else if (audio.duration) {
      if (+refBtn.current.id !== +playingMelodyId) {
        audio.pause();
        setAudio(new Audio(soundArr[refBtn.current.id - 1]));
        setPlayingMelodyId(+refBtn.current.id);
        if (!playingController) setPlayingController(!playingController);
      }
    }
  };
  return (
    <div className="soundBtn" id={text} ref={refBtn} onClick={SoundStartClick} >
      <h1>Sound{text}</h1>
    </div>
  );
};

export default SoundBtn;
