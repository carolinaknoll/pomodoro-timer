import React from 'react';
import PropTypes from 'prop-types';

export default function Reset({ resetTimer }) {
  return (
    <div className="reset">
      <button
        id="reset"
        className="control-button"
        onClick={resetTimer}
      >
        Reset
      </button>
    </div>
  )
}

Reset.propTypes = {
  resetTimer: PropTypes.func.isRequired
}
