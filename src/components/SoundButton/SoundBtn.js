import React, { useContext, useRef } from "react";
import { context } from "../Board/Board";
import "./soundBtn.scss";

// if (!audio.duration) {
//   setAudio(new Audio(soundArr[newMelodyId - 1]));
//   setPlayingMelodyId(newMelodyId);
//   setPlayingController(!playingController);
// } else if (audio.duration) {
//   if (+newMelodyId !== +playingMelodyId) {
//     audio.pause();
//     setAudio(new Audio(soundArr[newMelodyId - 1]));
//     setPlayingMelodyId(+newMelodyId);
//     if (!playingController) setPlayingController(!playingController);
//   }
// }
// value={[audio,setAudio,playingMelodyId, setPlayingMelodyId,playingController, setPlayingController,newMelodyId, setNewMelodyId]}>

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

  const click = () => {

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
    <div className="soundBtn" id={text} ref={refBtn} onClick={click} >
      <h1>Sound{text}</h1>
    </div>
  );
};

export default SoundBtn;
