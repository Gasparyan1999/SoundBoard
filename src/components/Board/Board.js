import React, { createContext, useRef, useState, useEffect } from "react";
import { ImArrowRight, ImArrowLeft } from "react-icons/im";
import SoundContainer from "../SoundContainer/SoundContainer";
import SpeedBtn from "../SpeedBtn/SpeedBtn";
import data from "../../Data/Data";

import "./board.scss";

export const context = createContext();

const speedMelodyArray = [0.5, 1, 2];

const Board = () => {
  const numberOfMelodiesInContainer = [];
  let count = 1;
  let newArr = [];

  data.forEach((elem, index) => {
    if (count !== 3) {
      newArr.push(index + 1);
      count++;
    } else {
      newArr.push(index + 1);
      numberOfMelodiesInContainer.push(newArr);
      newArr = [];
      count = 1;
    }
    if (index === data.length - 1 && newArr.length )
      numberOfMelodiesInContainer.push(newArr);
  });

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
    else if (active === 0) active = - (numberOfMelodiesInContainer.length-1);
    if (slider.current !== null) {
      Array.from(slider.current["children"]).forEach((elem) => {
        elem.style = `transform:translateX(${active * 100}%)`;
      });
    }
  };

  const arrowRight = () => {
    if (active !== -(numberOfMelodiesInContainer.length - 1)) active--;
    else if (active === -(numberOfMelodiesInContainer.length - 1)) active = 0;

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
        ]}
      >
        <div className="buttonsScreen">
          <div className="arrow" onClick={arrowLeft}>
            <h2>
              <ImArrowLeft />
            </h2>
          </div>
          <div className="audioScreen" ref={slider}>
            {numberOfMelodiesInContainer.map((elem) => {
              return <SoundContainer info={elem} />;
            })}
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
