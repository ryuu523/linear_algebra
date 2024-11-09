import React from 'react';
import Square from './Square';
import '../styles/drawField.css';

function DrawField({ field, onCellUpdate, onMouseDown, onMouseUp }) {
  return (
    <div className='center' onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      {field.map((row, y) => (
        <div className="flex" key={`row:${y}`}>
          {row.map((cell, x) => (
            <Square 
              key={`square:${x},${y}`} 
              x={x} 
              y={y} 
              color={cell} 
              onCellUpdate={onCellUpdate} 
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default DrawField;