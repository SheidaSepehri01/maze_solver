import clsx from "clsx";
import START from "../../../assets/start.svg";
import GOAL from "../../../assets/goal.svg";
import CHECKED from "../../../assets/checked.svg";
export const Cell = (props: {
  draw: boolean;
  num: number;
  handleSettingWalls: () => void;
}) => {
  const { draw, handleSettingWalls, num } = props;
  const isChecked = num === 4;
  return (
    <div
      className={clsx(num === 1 && "cel_active", "cel", num === 4 && "path")}
      onMouseEnter={() => {
        if (draw) handleSettingWalls();
      }}
    >
      {num === 2 && <img src={START} />}
      {num === 3 && <img src={GOAL} />}
      {/* {isChecked && <img src={CHECKED} />} */}
    </div>
  );
};
