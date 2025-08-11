import React, { useEffect } from 'react';
import './Game.css';
import { shiftGrid } from '../logic/gridHandler';

const KEYS_TO_HANDLE = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

function GameBoard({ grid, setGrid }: {
  grid: string[], 
  setGrid: React.Dispatch<React.SetStateAction<string[]>>
}) {

  // handle arrow keys
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (KEYS_TO_HANDLE.includes(event.key)) {
        setGrid(prevGrid => {
          const newGrid = shiftGrid(prevGrid, event.key);
          
          return newGrid;
        });
      } 
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setGrid]);
  

  return (
      <div className='gameboard-container'>
      <div className='gameboard'>
        {[0, 1, 2, 3].map(row => (
        <div className='grid-row' key={row}>
          {[0, 1, 2, 3].map(col => {
            const index = row * 4 + col;
            return (
              <div className={`grid-cell cell${grid[index]}`} key={col}>
                {grid[index] ?? ''}
              </div>
            );
          })}
        </div>
      ))}
      </div>
      </div>
  );
}

export default GameBoard;