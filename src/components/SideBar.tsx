import './Game.css';

function SideBar({ resetGame }: { resetGame: () => void }) {
  return (
    <div className="sidebar">
      <button type="button" onClick={resetGame} id="reset-btn" className="btn">Nytt spel</button>
    </div>
  );
}

export default SideBar;
