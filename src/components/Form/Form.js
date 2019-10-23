import React from 'react';
import './Form.css';

function Form (props) {
  return (
    <div className="maze-form">
      <form onSubmit={props.onSubmit}>
        <label>
          Width:
          <input type="number" name="maze-width" min="15" max="25" defaultValue={props.settings['maze-width']} />
        </label>
        <label>
          Height:
          <input type="number" name="maze-height" min="15" max="25" defaultValue={props.settings['maze-height']} />
        </label>
        <label>
          Difficulty:
          <input type="number" name="difficulty" min="0" max="10" defaultValue={props.settings['difficulty']} />
        </label>
        <input type="submit" value="Create new maze" />
      </form>
    </div>
  )
}

export default Form;
