import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

const Top5Modal = ({ closeTop5Modal, score, top5Players, timer }) => {
  //Top 5 Modal Methods ================================================
  const [username, setUsername] = useState("");

  function onChangeUsername(e) {
    //this.setState({ username: e.target.value.toUpperCase() });
    setUsername(e.target.value.toUpperCase());
  }

  function onSubmit(e) {
    e.preventDefault();
    closeTop5Modal();
    //setUsername(e.target.username.value);

    const user = {
      username,
      score,
    };
    axios
      .post("/users/add", user)
      .then((res) => console.log("axios post", res.data));
  }

  return (
    <Modal
      isOpen={timer === 0}
      contentLabel="Selected Option"
      ariaHideApp={false}
      closeTimeoutMS={200}
      className="top5-modal"
      style={{ overlay: { backgroundColor: "rgba(0, 31, 63, 0.7" } }}
    >
      <div>
        <h1 className="top5-modal__title">
          <span style={{ color: "#FF9AA2" }}>T</span>
          <span style={{ color: "#FFB7B2" }}>O</span>
          <span style={{ color: "#FFDAC1" }}>P </span>
          <span style={{ color: "#E2F0CB" }}>F</span>
          <span style={{ color: "#B5EAD7" }}>I</span>
          <span style={{ color: "#C7CEEA" }}>V</span>
          <span style={{ color: "#FF9AA2" }}>E</span>
          <span style={{ color: "#C7CEEA" }}></span>
          <span style={{ color: "#E0FEFE" }}></span>
          <span style={{ color: "#FF9AA2" }}></span>
        </h1>
      </div>
      <h4 className="top5-modal__score">New High Score!</h4>
      <h5 className="top5-modal__score">Score : {score}</h5>
      <ol>
        {top5Players.map((player) => (
          <li className="top5-modal__list" key={player._id}>
            {player.username} - {player.score}
          </li>
        ))}
      </ol>
      <form onSubmit={onSubmit}>
        <input
          className="top5-modal__input"
          type="text"
          value={username}
          onChange={onChangeUsername}
          minLength="3"
          maxLength="3"
          name="username"
          placeholder="Initials"
          required
        />
        <button className="top5-modal__submit-btn">Submit</button>
      </form>
    </Modal>
  );
};

export default Top5Modal;
