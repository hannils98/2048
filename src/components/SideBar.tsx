import './Game.css';
import './Modal.css';
import { useEffect, useRef } from 'react';
import Modal from 'bootstrap/js/dist/modal';

function SideBar({ resetGame }: { resetGame: () => void }) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const modalInstance = useRef<Modal | null>(null);

  // Prevent duplicate backdrops
  useEffect(() => {
    if (modalRef.current) {
      modalInstance.current = new Modal(modalRef.current);
    }

    return () => {
      if (modalInstance.current) {
        modalInstance.current.dispose(); 
        modalInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="sidebar">
      <button type="button" className="btn sidebar-btn" onClick={() => modalInstance.current?.show()}>How to play</button>
      <button type="button" onClick={resetGame} className="btn sidebar-btn">New game</button>

      <div className="modal fade" id="howToModal" tabIndex={-1} aria-labelledby="howToModalLabel" aria-hidden="true" ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              <h1 className="modal-title fs-5 text-center" id="howToModalLabel"> How to play</h1>
              <p> Use your arrow keys to move the tiles.<br /> 
                  When two tiles with the same number touch they merge into one tile with the double value.<br /> 
                  The game is over when the board is filled with no more tiles to move.</p>
              <p> You win the game when you get the 2048 tile! *</p>
              <p className="tiny-text">* I haven't implemented this yet so sorry you never win :/</p>
            </div>
            <div className="modal-footer">
              <button type="button" onClick={resetGame} className="btn modal-btn" data-bs-dismiss="modal">Let's play</button>
            </div>
          </div>
      </div>
      </div>
    </div>
  );
}

export default SideBar;
