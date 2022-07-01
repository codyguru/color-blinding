import React from "react";
import PropTypes from "prop-types";

function ColorCircle({ color, isMatch, inProgress, classLevel }) {
  return (
    <div>
      <button
        disabled={!inProgress}
        type="button"
        className={classLevel}
        onClick={() => {
          isMatch(color);
        }}
        style={{ backgroundColor: color }}
      ></button>
    </div>
  );
}

export default ColorCircle;

ColorCircle.propTypes = {
  color: PropTypes.string.isRequired,
  isMatch: PropTypes.func.isRequired,
};
