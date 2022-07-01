import { Howl } from "howler";
import startChime from "../sounds/start_chime.mp3";
import incorrectChime from "../sounds/incorrect_chime.mp3";
import correctChime from "../sounds/correct_chime.mp3";

const startGameAudio = new Howl({
  src: [startChime],
  volume: 0.35,
});

const correctAudio = new Howl({
  src: [correctChime],
  volume: 0.35,
});

const incorrectAudio = new Howl({
  src: [incorrectChime],
  volume: 0.35,
});

const startGameSound = () => {
  startGameAudio.play();
};

const correctPlaySound = () => {
  correctAudio.play();
};

const incorrectPlaySound = () => {
  incorrectAudio.play();
};

export { correctPlaySound, incorrectPlaySound, startGameSound };
