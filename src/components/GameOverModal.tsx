import { useEffect } from 'react';
import * as bootstrap from 'bootstrap';
import './Game.css';
import './Modal.css';

function GameOverModal({ resetGame }: {
  resetGame: () => void
}) {

  // close modal on Enter key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        const modalElement = document.getElementById("gameOverModal");
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) modal.hide();
        }
        resetGame();
      } 
    };

    const myModal = document.getElementById("gameOverModal");
    myModal?.addEventListener("keydown", handleKeyDown);
    return () => {
      myModal?.removeEventListener("keydown", handleKeyDown);
    };
  }, [resetGame]);

  return (
    <div className="modal fade" id="gameOverModal" tabIndex={-1} aria-labelledby="gameOverModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <h1 className="modal-title fs-5 text-center" id="gameOverModalLabel">Game over :(</h1>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={resetGame} className="btn modal-btn" data-bs-dismiss="modal">Play again</button>
          </div>
        </div>
    </div>
    </div>
    
  );
}

export default GameOverModal;