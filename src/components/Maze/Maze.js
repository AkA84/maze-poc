import React from "react";
import { useSelector } from "react-redux";
import Cell from "../Cell";

import './Maze.css';

function Maze () {
  const maze = useSelector(state => state.maze);
  const [ width, height ] = maze.size;

  return (
    <div className="maze">
      {Array(height).fill().map((__, rowIndex) => (
        <div className="maze-row" key={rowIndex}>
          {Array(width).fill().map((__, colIndex) => {
            const cellIndex = colIndex + (width * rowIndex);
            const props = {
              content: getCellContent(cellIndex, maze),
              walls: maze.data[cellIndex]
            };

            return <Cell key={colIndex} {...props} />
          })}
        </div>
      ))}
    </div>
  );
}

/**
 * Determines the content (if any) of the cell at the given index
 *
 * @param {number} cellIndex
 * @param {object} maze 
 */
function getCellContent (cellIndex, maze) {
  if (maze.domokun[0] === cellIndex) {
    return 'monster';
  }

  if (maze.pony[0] === cellIndex) {
    return 'pony';
  }

  if (maze['end-point'][0] === cellIndex) {
    return 'exit';
  }

  return null;
}

export default Maze;
