import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "./App.css";

const numRows = 50;
const numCols = 50;

const neighborOps = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const genEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }

  return rows;
};

const App = () => {
  const [grid, setGrid] = useState(() => {
    return genEmptyGrid();
  });

  console.log(grid);

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running; // current value of Ref is == to value of running

  const runSim = useCallback(() => {
    if (!runningRef.current) {
      return; //kill condition
    }

    // run simulation
    // double for loop runs through every cell on the board
    setGrid((g) => {
      // g = current Grid
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            neighborOps.forEach(([x, y]) => {
              // with a given cell, compute how many neighbors it has
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                // check to see if cell is in bounds
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              // determines if cell becomes alive/dead/stays the same
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSim, 100);
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>The Game of Life</h1>
          <br></br>
          <button
            className="button"
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                runSim(); // runs simulation
              }
            }}
          >
            {running ? "stop" : "start"}
          </button>
          <button
            className="button"
            onClick={() => {
              const rows = [];
              for (let i = 0; i < numRows; i++) {
                rows.push(
                  Array.from(Array(numCols), () =>
                    Math.random() > 0.7 ? 1 : 0
                  )
                );
              }

              setGrid(rows);
            }}
          >
            populate
          </button>
          <button
            className="button"
            onClick={() => {
              setGrid(genEmptyGrid());
            }}
          >
            clear
          </button>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${numCols}, 20px)`,
              justifyContent: "center",
            }}
          >
            {grid.map((rows, i) =>
              rows.map((col, k) => (
                <div
                  key={`${i}-${k}`}
                  onClick={() => {
                    const newGrid = produce(grid, (gridCopy) => {
                      gridCopy[i][k] = grid[i][k] ? 0 : 1;
                    });
                    setGrid(newGrid);
                  }}
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: grid[i][k] ? "black" : undefined,
                    border: "solid 1px white",
                  }}
                />
              ))
            )}
          </div>
        </header>
      </div>
    </>
  );
};

export default App;
