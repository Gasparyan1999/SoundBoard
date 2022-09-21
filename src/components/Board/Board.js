import React, { createContext, useRef, useState, useEffect } from "react";
import { ImArrowRight, ImArrowLeft } from "react-icons/im";
import SoundContainer from "../SoundContainer/SoundContainer";
import SpeedBtn from "../SpeedBtn/SpeedBtn";
import sound1 from "../music/1.mp3";
import sound2 from "../music/2.mp3";
import sound3 from "../music/3.mp3";
import sound4 from "../music/4.mp3";
import sound5 from "../music/5.mp3";
import sound6 from "../music/6.mp3";
import sound7 from "../music/7.mp3";
import sound8 from "../music/8.mp3";
import sound9 from "../music/9.mp3";
import "./board.scss";

export const context = createContext();

const numberOfMelodiesInContainer = {
  containerOne: [1, 2, 3],
  containerTwo: [4, 5, 6],
  containerThree: [7, 8, 9],
};

const speedMelodyArray = [0.5, 1, 2];

const Board = () => {
  const soundArr = [
    sound1,
    sound2,
    sound3,
    sound4,
    sound5,
    sound6,
    sound7,
    sound8,
    sound9,
  ];

  const [audio, setAudio] = useState(new Audio());
  const [playingMelodyId, setPlayingMelodyId] = useState(0);
  const [playingController, setPlayingController] = useState(false);

  const pauseMelody = () => {
    setPlayingController(!playingController);
  };

  useEffect(() => {
    playingController ? audio.play() : audio.pause();
  }, [playingController, audio]);

  const slider = useRef(null);
  let active = 0;

  const arrowLeft = () => {
    if (active !== 0) active++;
    else if (active === 0) active = -2;
    if (slider.current !== null) {
      Array.from(slider.current["children"]).forEach((elem) => {
        elem.style = `transform:translateX(${active * 100}%)`;
      });
    }
  };

  const arrowRight = () => {
    if (active !== -2) active--;
    else if (active === -2) active = 0;

    if (slider.current !== null) {
      Array.from(slider.current["children"]).forEach((elem) => {
        elem.style = `transform:translateX(${active * 100}%)`;
      });
    }
  };

  return (
    <div className="board">
      <context.Provider
        value={[
          audio,
          setAudio,
          playingMelodyId,
          setPlayingMelodyId,
          playingController,
          setPlayingController,
          soundArr,
        ]}
      >
        <div className="buttonsScreen">
          <div className="arrow" onClick={arrowLeft}>
            <h2>
              <ImArrowLeft />
            </h2>
          </div>
          <div className="audioScreen" ref={slider}>
            <SoundContainer info={numberOfMelodiesInContainer.containerOne} />
            <SoundContainer info={numberOfMelodiesInContainer.containerTwo} />
            <SoundContainer info={numberOfMelodiesInContainer.containerThree} />
          </div>
          <div className="arrow" onClick={arrowRight}>
            <h2>
              <ImArrowRight />
            </h2>
          </div>
        </div>
        <div className="speedBtn">
          {speedMelodyArray.map((elem) => {
            return <SpeedBtn num={elem} audio={audio} />;
          })}
        </div>
        <button className="pauseBtn" onClick={pauseMelody}>
          Pause/Continue
        </button>
      </context.Provider>
    </div>
  );
};

export default Board;
