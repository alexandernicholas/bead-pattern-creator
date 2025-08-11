import React, { useState } from 'react';

function Controls({ patternSize, setPatternSize, beadSize, setBeadSize }) {
    const [patternName, setPatternName] = useState(null);

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setPatternSize(prev => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="controls">
        {/* Pattern Name Input*/}
        <label>Pattern Name:
            <input
            type="text"
            value={patternName || ''} // null default
            onChange={(e) => setPatternName(e.target.value)}
            placeholder="Enter Pattern Name"
            />
        </label>
        {/* Dimension Inputs */}
      <label>
        Length (mm):
        <input 
          type="number" 
          name="length" 
          value={patternSize.length} 
          onChange={handleSizeChange} 
          min="1"
        />
      </label>
      <label>
        Width (mm):
        <input 
          type="number" 
          name="width" 
          value={patternSize.width} 
          onChange={handleSizeChange} 
          min="1"
        />
      </label>
      {/* Bead Size */}
      <label>
        Bead Size (mm):
        <input 
          type="number" 
          value={beadSize} 
          onChange={(e) => setBeadSize(Number(e.target.value))} 
          min="1"
        />
      </label>
    </div>
  );
}

export default Controls;