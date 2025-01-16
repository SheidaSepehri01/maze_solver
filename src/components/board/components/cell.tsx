import clsx from "clsx";
import START from "../../../assets/start.svg";
import GOAL from "../../../assets/goal.svg";
import CHECKED from "../../../assets/checked.svg";
export const Cell = (props: {
  draw: boolean;
  num: number;
  handleSettingWalls: () => void;
  algo: string;
}) => {
  const { draw, handleSettingWalls, num } = props;
  const isChecked = num === 4;
  const pathColor = props.algo === "astar" ? "green" : "blue";
  return (
    <div
      className={clsx(num === 1 && "cel_active", "cel")}
      onMouseEnter={() => {
        if (draw) handleSettingWalls();
      }}
      style={{
        backgroundColor: num === 4 ? pathColor : undefined,
      }}
    >
      {num === 2 && (
        <img
          src={START}
          style={{
            width: "25px",
            height: "25px",
          }}
        />
      )}
      {num === 3 && (
        <img
          src={GOAL}
          style={{
            width: "25px",
            height: "25px",
          }}
        />
      )}
      {/* {isChecked && <img src={CHECKED} />} */}
    </div>
  );
};
