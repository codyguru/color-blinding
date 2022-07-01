import React, { useState, useEffect, useRef } from "react";
import Gameboard from "./Gameboard";
import GameOverModal from "./GameOverModal";
import HowToPlayModal from "./HowToPlayModal";
import Top5Modal from "./Top5Modal";

import shuffleColorArray from "../utils/gameUtils.js";
import { Animated } from "react-animated-css";
import axios from "axios";
import {
  correctPlaySound,
  incorrectPlaySound,
  startGameSound,
} from "./Sounds.js";

function App() {
  const colorSet = [
    // yellow
    ["#e8d505", "#d9c704"],
    // green
    ["#33a151", "#2e8f48"],
    // blue
    ["#2e368f", "#282f7d"],
    // red
    ["#873333", "#7a2f2f"],
    // light red - red
    ["#9e3c3c", "#873333"],
    // light blue - blue
    ["#333b9e", "#2b338c"],
    // light green - green
    ["#32994e", "#2e8f48"],
    // light pink - pink
    ["#d68bd1", "#bd7bb8"],
  ];

  // Game
  const [colors, setColors] = useState([]);
  const [score, setScore] = useState(0);
  const [colorPair, setColorPair] = useState([]);
  const [size, setSize] = useState(4);
  const [matchFeedback, setMatchFeedback] = useState("feedbackClass");
  const [classLevel, setClassLevel] = useState("circleBtn circleSize-level1");
  const [initialStart, setInitialStart] = useState(true);
  const [inProgress, setInProgress] = useState(false);

  // Timer
  const [timer, setTimer] = useState(15);
  const timerId = useRef(null);
  const didMount = useRef(false);

  // Modal
  const [howToPlayModal, setHowToPlayModal] = useState(false);
  const [top5Modal, setTop5Modal] = useState(true);
  const [top5Players, setTop5Players] = useState([]);
  const [fifthScore, setFifthScore] = useState("");

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
    } else {
      if (timer < 0.5) {
        clearInterval(timerId.current);
        setInProgress(false);
        //setInitialStart(false);
      }
    }
  }, [timer]);

  function startGame() {
    loadColor();

    setInProgress(true);

    if (initialStart === true) {
      startGameSound();
      setInitialStart(false);
    }

    if (!inProgress) {
      countDown();
    }
    if (timer === 0) {
      resetGame();
    }
  }

  function loadColor() {
    const randNum = Math.floor(Math.random() * 8);
    setColorPair(colorSet[randNum]);
  }

  useEffect(() => {
    if (colorPair.length) {
      const colorArray = [colorPair[0]];

      for (let i = 1; i < size; i += 1) {
        colorArray.push(colorPair[1]);
      }
      shuffleColorArray(colorArray);
      setColors(colorArray);
    }
  }, [colorPair]);

  function isMatch(color) {
    let counter = 0;
    for (let i = 0; i < 3; i += 1) {
      if (color === colors[i]) {
        counter += 1;
      }
    }
    counter < 2 ? correctPick() : incorrectPick();
  }

  function nextLevel() {
    if (score === 5) {
      setSize(9);
    } else if (score === 11) {
      setSize(16);
    } else if (score === 16) {
      setSize(25);
    } else if (score === 26) {
      setSize(36);
    }
  }

  function setCircleSize() {
    if (score < 5) {
      setClassLevel("circleBtn circleSize-level1");
    } else if (score >= 26) {
      setClassLevel("circleBtn circleSize-level5");
    } else if (score >= 16) {
      setClassLevel("circleBtn circleSize-level4");
    } else if (score >= 11) {
      setClassLevel("circleBtn circleSize-level3");
    } else if (score >= 5) {
      setClassLevel("circleBtn circleSize-level2");
    }
  }

  function correctPick() {
    setColors([]);
    correctPlaySound();
    increment();
    handleAlterTime("correct");
    // We can do a useEffect on size
    nextLevel();
    // Set Circle Size could be a useEffect too
    setCircleSize();
    startGame();
    handleFeedback("correct feedbackClass");
  }

  function incorrectPick() {
    handleFeedback("incorrect feedbackClass");
    handleAlterTime("incorrect");
    incorrectPlaySound();
  }

  function handleFeedback(feedback) {
    setMatchFeedback(feedback);
    setTimeout(() => {
      setMatchFeedback("feedbackClass");
    }, 500);
  }

  function increment() {
    setScore(score + 1);
  }

  function resetGame() {
    setTimer(15);
    setScore(0);
    setSize(4);
    setClassLevel("circleBtn circleSize-level1");
    startGameSound();
  }

  // Timer Logic
  function countDown() {
    timerId.current = setInterval(() => {
      setTimer((prevState) => prevState - 0.5);
    }, 500);
  }

  function handleAlterTime(outcome) {
    outcome === "correct" ? setTimer(timer + 0.5) : setTimer(timer - 0.5);
  }

  // Modal Logic
  function handleHowToPlayModal() {
    setHowToPlayModal(!howToPlayModal);
  }

  function updateTop5List() {
    axios.get("/users").then((response) => {
      //else auto top 5
      console.log(response, "response here");
      if (response.data.length > 0) {
        // mongo query the data to sort LIMIT 5 DESC
        // const sortedPlayers = response.data.sort(this.compare);
        // setTop5Players(sortedPlayers.slice(0, 5));
        console.log(response, "here are the top 5 players");
        setTop5Players(response);
      }
    });
  }

  useEffect(() => {
    updateTop5List();
  }, []);

  // useEffect(() => {
  //   setFifthScore(top5Players[4].score);
  // }, [top5Players]);

  function closeTop5Modal() {
    setTop5Modal(false);
  }

  return (
    <div className="main-container">
      <Animated
        animationIn="bounceInLeft"
        animationOut="fadeOut"
        isVisible={true}
        animationInDuration={1800}
      >
        <h1 className="main-container__title">
          <span style={{ color: "#FF9AA2" }}>C</span>
          <span style={{ color: "#FFB7B2" }}>O</span>
          <span style={{ color: "#FFDAC1" }}>L</span>
          <span style={{ color: "#E2F0CB" }}>O</span>
          <span style={{ color: "#B5EAD7" }}>R </span>

          <span style={{ color: "#C7CEEA" }}>B</span>
          <span style={{ color: "#FF9AA2" }}>L</span>
          <span style={{ color: "#C7CEEA" }}>I</span>
          <span style={{ color: "#E0FEFE" }}>N</span>
          <span style={{ color: "#FF9AA2" }}>D</span>
        </h1>
      </Animated>
      <div className="main-container__score-time">
        <h3 className="main-container__time">
          TIME: <span>{timer}</span>
        </h3>
        <h3 className="main-container__score">
          SCORE: <span>{score}</span>{" "}
        </h3>
      </div>

      {initialStart && (
        <button
          className="main-container__htp-btn"
          onClick={handleHowToPlayModal}
        >
          How To Play
        </button>
      )}

      {initialStart && (
        <button
          className="main-container__startbtn"
          onClick={startGame}
          disabled={inProgress}
        >
          {" "}
          {timer === 0 ? "Replay" : "Start"}
        </button>
      )}

      {howToPlayModal && (
        <HowToPlayModal
          howToPlayModal={howToPlayModal}
          closeHowToPlayModal={handleHowToPlayModal}
        />
      )}

      <p className={matchFeedback}>
        {matchFeedback === "incorrect feedbackClass"
          ? "TRY AGAIN! -0.5 SEC"
          : "ADD TIME +0.5 SEC!"}
      </p>
      {!!colors.length && (
        <div>
          <Gameboard
            isMatch={isMatch}
            colors={colors}
            score={score}
            inProgress={inProgress}
            classLevel={classLevel}
          />
          {score &&
            fifthScore &&
            top5Modal(
              <GameOverModal
                timer={timer}
                startGame={startGame}
                score={score}
                //top5Players={this.state.top5Players}
                updateTop5List={updateTop5List}
                // call this during mount
              />
            )}

          {score > fifthScore && top5Modal && !inProgress && (
            <Top5Modal
              top5Players={top5Players}
              score={score}
              closeTop5Modal={closeTop5Modal}
              timer={timer}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
