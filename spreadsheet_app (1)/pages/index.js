import React, { useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { useSpreadsheetStore } from '../store/store';
import 'tailwindcss/tailwind.css';

const CELL_WIDTH = 100;
const CELL_HEIGHT = 40;
const ROWS = 100;
const COLS = 10;

const Cell = ({ columnIndex, rowIndex, style }) => {
  const { grid, updateCell, updateFormatting } = useSpreadsheetStore(); // Access the grid, updateCell, and updateFormatting function from Zustand
  const cellData = grid[rowIndex][columnIndex]; // Get the current value and formatting of the cell

  return (
    <input
      style={{
        ...style,
        border: '1px solid #ccc',
        textAlign: cellData.alignment,
        fontSize: cellData.fontSize,
        padding: '5px',
        boxSizing: 'border-box',
        backgroundColor: '#f9f9f9',
        color: '#333',
      }}
      value={cellData.value} // Bind the value to the input field
      onChange={(e) => updateCell(rowIndex, columnIndex, e.target.value)} // Update cell content on input change
      className="focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
};

export default function Home() {
  const { clearGrid, undo, redo, updateSearchQuery, filterGrid, updateFormatting } = useSpreadsheetStore();
  const [selectedCell, setSelectedCell] = useState(null);

  const handleFormattingChange = (e) => {
    const { name, value } = e.target;
    if (selectedCell) {
      const { rowIndex, colIndex } = selectedCell;
      updateFormatting(rowIndex, colIndex, { [name]: value });
    }
  };

  const handleSearch = () => {
    filterGrid();
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Spreadsheet App</h1>

      <div className="mb-4 flex justify-between">
        <div>
          <label className="mr-2">Text Alignment:</label>
          <select name="alignment" onChange={handleFormattingChange} className="mr-4 p-2 border border-gray-300 rounded">
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>

          <label className="mr-2">Font Size:</label>
          <select name="fontSize" onChange={handleFormattingChange} className="p-2 border border-gray-300 rounded">
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
          </select>
        </div>

        <div>
          <input 
            type="text" 
            placeholder="Search..." 
            onChange={(e) => updateSearchQuery(e.target.value)} 
            className="p-2 border border-gray-300 rounded" 
          />
          <button 
            onClick={handleSearch} 
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          >
            Search
          </button>
        </div>
      </div>

      <Grid
        columnCount={COLS}
        columnWidth={CELL_WIDTH}
        height={400} // Height of the grid container
        rowCount={ROWS}
        rowHeight={CELL_HEIGHT}
        width={COLS * CELL_WIDTH} // Width of the grid container
        onClick={(e) => setSelectedCell({ rowIndex: e.target.dataset.row, colIndex: e.target.dataset.col })}
      >
        {Cell}
      </Grid>

      <div className="mt-4 flex justify-center">
        <button onClick={undo} className="p-2 mr-2 bg-gray-200 rounded-lg">Undo</button>
        <button onClick={redo} className="p-2 mr-2 bg-gray-200 rounded-lg">Redo</button>
        <button onClick={clearGrid} className="p-2 bg-red-500 text-white rounded-lg">Clear Grid</button>
      </div>
    </div>
  );
}
