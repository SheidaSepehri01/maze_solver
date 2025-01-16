import PLAY from "../../assets/play_arrow_40dp_E8EAED_FILL0_wght400_GRAD0_opsz40.svg";
import RESET from "../../assets/refresh_40dp_E8EAED_FILL0_wght400_GRAD0_opsz40.svg";
import DRAW from "../../assets/draw.svg";
import clsx from "clsx";

export const Controls = (props: {
  handleDraw: () => void;
  draw: boolean;
  HandleReset: () => void;
  handleStart: (val: boolean) => void;
  handleSetAlgo: (val: string) => void;
}) => {
  return (
    <div className="controls_container">
      <div className="flex">
        <button onClick={() => props.handleStart(true)}>
          <img src={PLAY} />
        </button>
        <button
          onClick={props.handleDraw}
          className={clsx(props.draw && "active_button")}
          title="draw mode"
        >
          <img src={DRAW} />
        </button>
        <button onClick={props.HandleReset} title="reset board">
          <img src={RESET} />
        </button>
      </div>
      <select
        className="select"
        onChange={(e) => props.handleSetAlgo(e.currentTarget.value)}
      >
        <option selected>astar</option>
        <option>dijkstra</option>
      </select>
    </div>
  );
};
