import React from 'react';

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

export default Cell;
