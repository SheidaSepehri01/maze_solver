import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./components/board";
import { Controls } from "./components/controls";

function App() {
  const [draw, setDraw] = useState(false);
  const [reset, setReset] = useState(false);
  const [start, setStart] = useState(false);
  const handleReset = () => {
    setReset(!reset);
  };
  const handleStart = (val: boolean) => {
    setStart(val);
    debugger;
  };
  return (
    <div className="container">
      <div className="note">{<h3 className="note"></h3>}</div>

      <div className="flex_center">
        <Controls
          draw={draw}
          handleDraw={() => {
            setDraw(!draw);
          }}
          HandleReset={handleReset}
          handleStart={handleStart}
        />
        <Board
          draw={draw}
          reset={reset}
          handleReset={handleReset}
          handleStart={handleStart}
          start={start}
        />
      </div>
    </div>
  );
}

export default App;
