import React from 'react';

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
