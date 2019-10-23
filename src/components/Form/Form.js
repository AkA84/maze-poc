import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

function Form ({ settings, onSubmit }) {
  return (
    <div className="maze-form">
      <form onSubmit={onSubmit}>
        <label>
          Width:
          <input type="number" name="maze-width" min="15" max="25" defaultValue={settings['maze-width']} />
        </label>
        <label>
          Height:
          <input type="number" name="maze-height" min="15" max="25" defaultValue={settings['maze-height']} />
        </label>
        <label>
          Difficulty:
          <input type="number" name="difficulty" min="0" max="10" defaultValue={settings['difficulty']} />
        </label>
        <input type="submit" value="Create new maze" />
      </form>
    </div>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  settings: PropTypes.exact({
    'maze-width': PropTypes.number,
    'maze-height': PropTypes.number,
    'difficulty': PropTypes.number
  }).isRequired
}

export default React.memo(Form);
