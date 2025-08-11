import React, { useEffect, useState } from 'react';

function Grid({ patternSize, beadSize, cells, setCells, selectedColor }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const rows = Math.floor(patternSize.width / beadSize);
  const cols = Math.floor(patternSize.length / beadSize);
  const cellSize = 20;

  // Initialize grid
  useEffect(() => {
    const newCells = Array(rows).fill().map(() => Array(cols).fill(null));
    setCells(newCells);
  }, [rows, cols, setCells]);

  // Handle cell color change
  const handleCellColorChange = (row, col) => {
    const newCells = cells.map(r => [...r]);
    newCells[row][col] = selectedColor;
    setCells(newCells);
  };

  // Mouse down handler
  const handleMouseDown = (row, col) => {
    setIsDrawing(true);
    handleCellColorChange(row, col);
  };

  // Mouse enter handler (for dragging)
  const handleMouseEnter = (row, col) => {
    if (isDrawing) {
      handleCellColorChange(row, col);
    }
  };

  // Mouse up handler
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div 
      className="grid" 
      style={{ 
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        width: `${cols * cellSize}px`
      }}
      onMouseLeave={handleMouseUp}
    >
      {cells.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="cell"
            style={{
              backgroundColor: cell || 'white',
              width: `${cellSize}px`,
              height: `${cellSize}px`
            }}
            onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
            onMouseUp={handleMouseUp}
          />
        ))
      ))}
    </div>
  );
}

export default Grid;