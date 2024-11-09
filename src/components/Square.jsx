import "../styles/square.css";

function Square({ x, y, color, onCellUpdate }) {
  const handleMouseEnter = () => onCellUpdate(x, y);

  return (
    <div 
      className="square" 
      style={{ backgroundColor: color }} 
      onMouseEnter={handleMouseEnter}
    >
    </div>
  );
}

export default Square;