import React, { useState } from 'react';
import beadData from '../data/bead_sizes.json';

const beadOptions = beadData.Beads;

function Controls({ patternSize, setPatternSize, beadSize, setBeadSize }) {
    const [patternName, setPatternName] = useState(null);

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setPatternSize(prev => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="controls">
        {/* Pattern Name Input*/}
        <label>
          <strong>Pattern Name:</strong>
            <input
            type="text"
            value={patternName || ''} // null default
            onChange={(e) => setPatternName(e.target.value)}
            placeholder="Enter Pattern Name"
            />
        </label>
        {/* Dimension Inputs */}
      <label>
        <strong>Length (mm):</strong>
        <input 
          type="number" 
          name="length" 
          value={patternSize.length} 
          onChange={handleSizeChange} 
          min="1"
        />
      </label>
      <label>
        <strong>Width (mm):</strong>
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
        <strong>Bead Size:</strong>
        <select value={beadSize}
        onChange={(e) => setBeadSize(Number(e.target.value))}
        >
          <option value="10">Select Bead Size</option>
          {beadOptions.map(bead => (
            <option key={bead.id} value={bead.length_mm}>
              {`${bead.brand} ${bead.size} ${bead.type} - ${bead.length_mm} mm`}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Controls;