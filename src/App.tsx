import { useState } from "react";
import "./App.css";
import { Board } from "./components/board";
import { Controls } from "./components/controls";

function App() {
  const [draw, setDraw] = useState(false);
  const [reset, setReset] = useState(false);
  const [start, setStart] = useState(false);
  const [algo, setAlgo] = useState("astar");
  const handleReset = () => {
    setReset(!reset);
  };
  const handleStart = (val: boolean) => {
    setStart(val);
  };
  const handleSetAlgo = (string: string) => {
    setAlgo(string);
    setReset(true);
  };
  return (
    <div className="container">
      <div className="note">{<h3 className="note"></h3>}</div>

      <div className="flex_center">
        <Board
          draw={draw}
          reset={reset}
          handleReset={handleReset}
          handleStart={handleStart}
          start={start}
          algo={algo}
        />
      </div>
      <Controls
        draw={draw}
        handleDraw={() => {
          setDraw(!draw);
        }}
        HandleReset={handleReset}
        handleStart={handleStart}
        handleSetAlgo={handleSetAlgo}
      />
    </div>
  );
}

export default App;
