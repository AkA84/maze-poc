import React from "react";
import PropTypes from 'prop-types';
import Cell from "../Cell";

import './Maze.css';

function Maze ({ maze }) {
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

Maze.propTypes = {
  maze: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.array),
    size: PropTypes.arrayOf(PropTypes.number),
    domokun: PropTypes.arrayOf(PropTypes.number),
    pony: PropTypes.arrayOf(PropTypes.number),
    'end-point': PropTypes.arrayOf(PropTypes.number)
  }).isRequired
}

export default Maze;
