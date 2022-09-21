import SoundBtn from "../SoundButton/SoundBtn";
import "./container.scss";

const SoundContainer = ({ info }) => {
  return (
    <div className="buttons">
      {info.map((elem) => {
        return <SoundBtn key={elem} text={elem} />;
      })}
    </div>
  );
};

export default SoundContainer;
