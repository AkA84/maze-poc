import React from 'react';
import PropTypes from 'prop-types';
import './Cell.css';

const INITIALS = {
  exit: 'E',
  monster: 'D',
  pony: 'P'
};

function Cell (props) {
  const classes = props.walls.map(wall => `maze-cell--wall-${wall}`)
    .concat(['maze-cell'])
    .join(' ');

  return (
    <div className={classes}>
      {props.content && INITIALS[props.content]}
    </div>
  );
}

Cell.propTypes = {
  walls: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Cell;
