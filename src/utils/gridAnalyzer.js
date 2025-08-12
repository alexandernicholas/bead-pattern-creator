// src/utils/gridAnalyzer.js

/**
 * Analyzes a grid row and returns color ranges
 */
export const analyzeRow = (row) => {
  if (!row || row.length === 0) return [];
  
  const result = [];
  let currentColor = row[0];
  let startIndex = 0;

  for (let i = 1; i <= row.length; i++) {
    if (i === row.length || row[i] !== currentColor) {
      const range = 
        startIndex === i - 1 
          ? `${startIndex + 1}` 
          : `${startIndex + 1}-${i}`;
      
      result.push({
        color: currentColor || 'empty',
        range: range,
        start: startIndex,
        end: i - 1
      });

      if (i < row.length) {
        currentColor = row[i];
        startIndex = i;
      }
    }
  }

  return result;
};

/**
 * Analyzes the entire grid
 */
export const analyzeGrid = (grid) => {
  if (!grid || grid.length === 0) return [];
  return grid.map((row, rowIndex) => ({
    row: rowIndex + 1,
    colors: analyzeRow(row)
  }));
};

/**
 * Counts occurrences of each color in the grid
 */
export const getColorCounts = (grid) => {
  const counts = {};
  grid.flat().forEach(color => {
    const colorKey = color || 'empty';
    counts[colorKey] = (counts[colorKey] || 0) + 1;
  });
  
  return Object.entries(counts)
    .map(([color, count]) => ({ color, count }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
};


/**
 * Counts occurrences of each color for each row in the grid
 */
export const getRowColorCounts = (grid) => {
  if (!grid || grid.length === 0) return [];

  return grid.map((row, rowIndex) => {
    const counts = {};
    row.forEach(color => {
      const key = color || 'empty';
      counts[key] = (counts[key] || 0) + 1;
    });

    return {
      row: rowIndex + 1,
      colors: Object.entries(counts)
      .map(([color, count]) => ({ color, count}))
    };
  });
}

/**
 * Returns color run counts for each row, preserving consecutive segments
 */
export const getRowColorRuns = (grid) => {
  if (!grid || grid.length === 0) return [];

  return grid.map((row, rowIndex) => {
    const runs = [];
    if (!row || row.length === 0) return { row: rowIndex + 1, colors: runs };

    let currentColor = row[0] || 'empty';
    let count = 1;

    for (let i = 1; i <= row.length; i++) {
      if (i === row.length || (row[i] || 'empty') !== currentColor) {
        runs.push({ color: currentColor, count });
        if (i < row.length) {
          currentColor = row[i] || 'empty';
          count = 1;
        }
      } else {
        count++;
      }
    }

    return { row: rowIndex + 1, colors: runs };
  });
};
