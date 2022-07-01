import React from "react";
import ColorCircle from "./ColorCircle";

function Gameboard({ colors, isMatch, score, inProgress, classLevel }) {
  return (
    <div className="gameboard">
      {colors.map((color, index) => (
        <ColorCircle
          key={index}
          color={color}
          isMatch={isMatch}
          score={score}
          inProgress={inProgress}
          classLevel={classLevel}
        />
      ))}
    </div>
  );
}

export default Gameboard;
