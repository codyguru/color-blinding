import React from "react";
import Modal from "react-modal";

const GameOverModal = ({ timer, score, startGame }) => (
  <Modal
    isOpen={timer === 0}
    contentLabel="Selected Option"
    ariaHideApp={false}
    closeTimeoutMS={200}
    className="gameover-modal"
    style={{ overlay: { backgroundColor: "rgba(0, 31, 63, 0.7" } }}
  >
    <h1 className="gameover-modal__title">
      <span style={{ color: "#FF9AA2" }}>G</span>
      <span style={{ color: "#FFB7B2" }}>A</span>
      <span style={{ color: "#FFDAC1" }}>M</span>
      <span style={{ color: "#E2F0CB" }}>E</span>
      <br />
      <span style={{ color: "#B5EAD7" }}>O</span>
      <span style={{ color: "#C7CEEA" }}>V</span>
      <span style={{ color: "#FF9AA2" }}>E</span>
      <span style={{ color: "#C7CEEA" }}>R</span>
      <span style={{ color: "#E0FEFE" }}>!</span>
    </h1>
    <h4 className="gameover-modal__header">Top 5 Players</h4>
    <ol>
      {/* {props.top5Players.map((player) => (
        <li className="top5-modal__list" key={player._id}>
          {player.username} - {player.score}
        </li>
      ))} */}
    </ol>

    <h4 className="gameover-modal__header">Your Score: {score}</h4>
    <button className="gameover-modal__startbtn" onClick={startGame}>
      Replay
    </button>
  </Modal>
);

export default GameOverModal;
