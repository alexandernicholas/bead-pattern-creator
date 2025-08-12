import React, { useState } from 'react';
import Controls from './components/Controls';
import Grid from './components/Grid';
import Palette from './components/Palette';
import './App.css';


function App() {
  const [patternName, setPatternName] = useState(null);
  const [patternSize, setPatternSize] = useState({ length: 100, width: 100 });
  const [beadSize, setBeadSize] = useState(5);
  const [cells, setCells] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#FF0000');

  return (
    <div className="app">
      <h1>Loops and Olive Bead Pattern Creator</h1>
      <Controls 
        patternName={patternName}
        setPatternName={setPatternName}
        patternSize={patternSize}
        setPatternSize={setPatternSize}
        beadSize={beadSize}
        setBeadSize={setBeadSize}
      />
      <Palette 
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <Grid 
        patternSize={patternSize}
        beadSize={beadSize}
        cells={cells}
        setCells={setCells}
        selectedColor={selectedColor}
      />
    </div>
  );
}


export default App;