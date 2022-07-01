const shuffleColorArray = (colorArray) => {
  const tempArray = colorArray;
  for (let i = colorArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
  }
  return tempArray;
};

export default shuffleColorArray;
