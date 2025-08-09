// import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React, { useState, useEffect } from 'react';
import * as bootstrap from 'bootstrap'; // Bootstrap JS
import './Game.css';
import { shiftGrid, resetGrid } from './logic/tilesHandler';

const KEYS_TO_HANDLE = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

function Game() {
  const [grid, setGrid] = useState(Array(16).fill(""));
  let [gameOver, setGameOver] = useState(false);

  // set starting grid
  useEffect(() => {
    setGrid(prevGrid => {
          const newGrid = resetGrid();
          return newGrid;
        });
  }, []);

  // handle if enter is used to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        const modal = bootstrap.Modal.getInstance(myModal);
        modal.hide();
        resetGame();
      } 
    };
  const myModal = document.getElementById("gameOverModal");
  myModal?.addEventListener("keydown", handleKeyDown);
  return () => {
      myModal?.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
  }, []);

  // game over
  useEffect(() => {
    console.log("grid changed");
    if (!grid.includes("") && gameOver === false){
      setGameOver(true);
      const modal = new bootstrap.Modal(document.getElementById('gameOverModal'));
      modal.show();
    }
  }, [gameOver, grid]);
  
  // reset game
  function resetGame() {
    setGrid(prevGrid => {
      const newGrid = resetGrid();
      setGameOver(false);
      return newGrid;
    });
  }

  return (
    <div className='grid'>

      <div className="modal fade" id="gameOverModal" tabIndex={-1} aria-labelledby="gameOverModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              <h1 className="modal-title fs-5 text-center" id="gameOverModalLabel">Där var spelet slut :(</h1>
              <button type="button" onClick={resetGame} className="btn modal-reset-btn" data-bs-dismiss="modal">Spela igen!</button>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar">
        <button type="button" onClick={resetGame} id="reset-btn" className="btn" data-bs-dismiss="modal">Nytt spel</button>
      </div>
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
    </div>
  );
}

export default Game;
