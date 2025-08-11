import React from 'react';

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#000000', '#FFFFFF'];

// Simple functional component
function Palette({ selectedColor, setSelectedColor }) {
  return (
    <div className="palette">
      {colors.map(color => (
        <button
          key={color}
          style={{ backgroundColor: color }}
          className={selectedColor === color ? 'selected' : ''}
          onClick={() => setSelectedColor(color)}
        />
      ))}
    </div>
  );
}

// Make sure this export exists exactly like this
export default Palette;