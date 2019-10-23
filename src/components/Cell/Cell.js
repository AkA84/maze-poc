import React from 'react';
import PropTypes from 'prop-types';
import './Cell.css';

const INITIALS = {
  exit: 'E',
  monster: 'D',
  pony: 'P'
};

function Cell ({ content, walls }) {
  const classes = walls.map(wall => `maze-cell--wall-${wall}`)
    .concat(['maze-cell'])
    .join(' ');

  return (
    <div className={classes}>
      {content && INITIALS[content]}
    </div>
  );
}

Cell.propTypes = {
  walls: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default React.memo(Cell, (prevProps, nextProps) => {
  return (
    prevProps.content === nextProps.content &&
    prevProps.walls.join('') === nextProps.walls.join('')
  );
});
