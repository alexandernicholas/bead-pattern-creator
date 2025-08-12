import React, { useEffect, useState } from 'react';
import { analyzeGrid, getRowColorRuns } from '../utils/gridAnalyzer';

function Grid({ patternSize, beadSize, cells, setCells, selectedColor, clearGrid }) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [analysis, setAnalysis] = useState([]);
  const [colorCounts, setColorCounts] = useState([]);

  const rows = Math.floor(patternSize.width / beadSize);
  const cols = Math.floor(patternSize.length / beadSize);
  const cellSize = 20;

  // Update analysis whenever cells change
  useEffect(() => {
    setAnalysis(analyzeGrid(cells));
    setColorCounts(getRowColorRuns(cells));
  }, [cells]);

  // Initialize grid
  useEffect(() => {
    initializeGrid();
  }, [rows, cols]);

  const initializeGrid = () => {
    const newCells = Array(rows).fill().map(() => Array(cols).fill(null));
    setCells(newCells);
  };

  // Handle cell color change
  const updateCell = (row, col) => {
    const newCells = [...cells];
    if (!newCells[row]) newCells[row] = [];
    newCells[row][col] = selectedColor;
    setCells(newCells);
  };

  // Mouse/touch handlers
  const startDrawing = (row, col) => {
    setIsDrawing(true);
    updateCell(row, col);
  };

  const continueDrawing = (row, col) => {
    if (isDrawing) {
      updateCell(row, col);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Touch handling
  const handleTouchMove = (e) => {
    if (!isDrawing) return;
    
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (element && element.dataset.row && element.dataset.col) {
      const row = parseInt(element.dataset.row);
      const col = parseInt(element.dataset.col);
      updateCell(row, col);
    }
  };

  // Helper to determine text color based on background
  const getTextColor = (bgColor) => {
    if (!bgColor || bgColor === 'empty') return '#333';
    // Convert hex to RGB
    const r = parseInt(bgColor.substr(1, 2), 16);
    const g = parseInt(bgColor.substr(3, 2), 16);
    const b = parseInt(bgColor.substr(5, 2), 16);
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#333' : '#fff';
  };

  function shadeColor(color, percent) {
  if (!color.startsWith('#') || (color.length !== 7 && color.length !== 4)) return color;
  let r = parseInt(color.substring(1,3), 16);
  let g = parseInt(color.substring(3,5), 16);
  let b = parseInt(color.substring(5,7), 16);

  r = Math.min(255, Math.max(0, r + (r * percent / 100)));
  g = Math.min(255, Math.max(0, g + (g * percent / 100)));
  b = Math.min(255, Math.max(0, b + (b * percent / 100)));

  return `rgb(${r},${g},${b})`;
}


  return (
    <div className="grid-container">
      <button 
        onClick={initializeGrid}
        className="clear-button"
      >
        Clear Grid
      </button>
      
      <div 
        className="grid"
        style={{ 
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          width: `${cols * cellSize}px`
        }}
        onMouseLeave={stopDrawing}
        onTouchMove={handleTouchMove}
        onTouchEnd={stopDrawing}
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
              data-row={rowIndex}
              data-col={colIndex}
              onMouseDown={() => startDrawing(rowIndex, colIndex)}
              onMouseEnter={() => continueDrawing(rowIndex, colIndex)}
              onMouseUp={stopDrawing}
              onTouchStart={() => startDrawing(rowIndex, colIndex)}
            />
          ))
        ))}
      </div>

    {/* Color Count Visualization */}
      <div className="color-counts">
        <h3>Bead Count</h3>
        {colorCounts.map(rowData => (
          <div key={rowData.row} className="row-count">
            {/* <strong>Row {rowData.row}:</strong> */}
            <div className="count-display">
              {rowData.colors.map((item, index) => (
                <div
                  key={index}
                  className="bead"
                  style={{
                    background: item.color === 'empty'
                      ? 'radial-gradient(circle at 30% 30%, #fff, #ccc)'
                      : `radial-gradient(circle at 30% 30%, ${item.color}, ${shadeColor(item.color, -20)})`,
                    color: getTextColor(item.color)
                  }}
                >
                  {item.count}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    
    </div>
  );
}

export default Grid;