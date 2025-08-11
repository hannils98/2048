import { useState, useEffect } from 'react';
import * as bootstrap from 'bootstrap';
import './Game.css';
import GameBoard from './GameBoard';
import GameOverModal from './GameOverModal';
import SideBar from './SideBar';
import { resetGrid } from '../logic/gridHandler';

function Game() {
  const [grid, setGrid] = useState(() => resetGrid());
  const [gameOver, setGameOver] = useState(false);

  function resetGame() {
    setGrid(prevGrid => {
      const newGrid = resetGrid();
      setGameOver(false);
      return newGrid;
    });
  }

  // game over check
  useEffect(() => {
    if (!grid.includes("") && gameOver === false){
      setGameOver(true);
      const modalElement = document.getElementById('gameOverModal');
      if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
    }
  }, [grid, gameOver]);

  return (
    <div className='grid'>
      <GameOverModal resetGame={resetGame} />
      <SideBar resetGame={resetGame}/>
      <GameBoard grid={grid} setGrid={setGrid} />
    </div>
  );
}

export default Game;

