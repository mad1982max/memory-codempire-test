const timerParser = ms => {
  let minutes = Math.floor(ms / 60);
  let seconds = ((ms % 60)).toFixed(0);
  return minutes + "m:" + (seconds < 10 ? '0' : '') + seconds + "s";
}

export { timerParser };