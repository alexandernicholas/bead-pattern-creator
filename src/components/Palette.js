import React, { useState } from 'react';

const defaultColors = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
  '#FF00FF', '#00FFFF', '#000000', '#C0C0C0'
];

const PlusIcon = () => <span style={{ fontSize: '14px' }}>+</span>;
const TimesIcon = () => <span style={{ fontSize: '14px' }}>×</span>;
const EyedropperIcon = () => <span>🎨</span>;

function Palette({ selectedColor, setSelectedColor }) {
  const [colors, setColors] = useState(defaultColors);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColor, setCustomColor] = useState('#FF0000');

  const handleAddColor = () => {
    if (!colors.includes(customColor)) {
      setColors([...colors, customColor]);
    }
    setSelectedColor(customColor);
    setShowColorPicker(false);
  };

  const handleRemoveColor = (color, e) => {
    e.stopPropagation();
    if (colors.length > 1) { // Prevent removing all colors
      setColors(colors.filter(c => c !== color));
      if (selectedColor === color) {
        setSelectedColor(colors[0]);
      }
    }
  };

  return (
    <div className="palette-container">
      <div className="palette-header">
        <h3>Color Palette</h3>
      </div>

      <div className="color-swatches">
        {colors.map(color => (
          <div 
            key={color} 
            className={`color-swatch-container ${selectedColor === color ? 'selected' : ''}`}
            onClick={() => setSelectedColor(color)}
          >
            <div 
              className="color-swatch"
              style={{ backgroundColor: color }}
            />
            <button 
              className="remove-color-btn"
              onClick={(e) => handleRemoveColor(color, e)}
              title="Remove color"
            >
              <TimesIcon />
            </button>
          </div>
        ))}
        <button 
          className="add-swatch-btn"
          onClick={() => setShowColorPicker(true)}
          title="Add new color"
        >
          <PlusIcon />
        </button>
      </div>

      {showColorPicker && (
        <div className="color-picker-modal">
          
          <div className="color-picker-actions">
            <button 
              className="add-color-btn"
              onClick={handleAddColor}
            >
              <PlusIcon /> Add to Palette
            </button>
            <button 
              className="cancel-btn"
              onClick={() => setShowColorPicker(false)}
            >
              Cancel
            </button>
          </div>
          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="color-wheel"
          />
        </div>
      )}

      <div className="current-color-display">
        <span>Selected:</span>
        <div className="current-swatch" style={{ backgroundColor: selectedColor }} />
        <span className="color-hex">{selectedColor}</span>
      </div>
    </div>
  );
}

export default Palette;