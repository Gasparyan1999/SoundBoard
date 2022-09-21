import React, { createContext, useRef, useState, useEffect } from "react";
import { ImArrowRight, ImArrowLeft } from "react-icons/im";
import SoundContainer from "../SoundContainer/SoundContainer";
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

  const playMelody = (e) => {
    if (!audio.duration) {
      setAudio(new Audio(soundArr[e.target.id - 1]));
      setPlayingMelodyId(e.target.id);
      setPlayingController(!playingController);
    } else if (audio.duration) {
      if (+e.target.id !== +playingMelodyId) {
        audio.pause();
        setAudio(new Audio(soundArr[e.target.id - 1]));
        setPlayingMelodyId(+e.target.id);
        if (!playingController) setPlayingController(!playingController);
      }
    }
  };

  const pauseMelody = (e) => {
    setPlayingController(!playingController);
  };

  useEffect(() => {
    playingController ? audio.play() : audio.pause();
  }, [playingController, audio]);

  const melodySpeed = (e) => {
    audio.playbackRate = +e.target.id;
  };

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
      <context.Provider value={[playMelody]}>
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
          <button id="0.5" onClick={melodySpeed}>
            X0.5
          </button>
          <button id="1" onClick={melodySpeed}>
            X1
          </button>
          <button id="2" onClick={melodySpeed}>
            X2
          </button>
        </div>
        <button className="pauseBtn" onClick={pauseMelody}>
          Pause/Continue
        </button>
      </context.Provider>
    </div>
  );
};

export default Board;
