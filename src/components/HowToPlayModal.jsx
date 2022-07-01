import React from "react";
import Modal from "react-modal";

const HowToPlayModal = ({ howToPlayModal, closeHowToPlayModal }) => (
  <Modal
    isOpen={howToPlayModal}
    contentLabel="Selected Option"
    ariaHideApp={false}
    closeTimeoutMS={200}
    className="htp-modal"
    style={{ overlay: { backgroundColor: "rgba(0, 31, 63, 0.7" } }}
  >
    <div className="htp-modal__header">
      <h1 className="htp-modal__title">
        <span style={{ color: "#FF9AA2" }}>H</span>
        <span style={{ color: "#FFB7B2" }}>O</span>
        <span style={{ color: "#FFDAC1" }}>W </span>
        <span style={{ color: "#E2F0CB" }}>T</span>
        <span style={{ color: "#B5EAD7" }}>O </span>
        <span style={{ color: "#C7CEEA" }}>P</span>
        <span style={{ color: "#FF9AA2" }}>L</span>
        <span style={{ color: "#C7CEEA" }}>A</span>
        <span style={{ color: "#E0FEFE" }}>Y</span>
      </h1>

      <button onClick={closeHowToPlayModal} className="htp-modal__btn">
        X
      </button>
    </div>

    <p className="htp-modal__paragraph">The rules are simple:</p>

    <p className="htp-modal__paragraph">
      Find the bubble with a slightly different color.
    </p>

    <p className="htp-modal__paragraph">
      If picked correctly, +.5 seconds will be added to your total time.
    </p>

    <p className="htp-modal__paragraph">
      Picked incorrectly, -.5 seconds will be deducted from your total time.
    </p>
  </Modal>
);

export default HowToPlayModal;
