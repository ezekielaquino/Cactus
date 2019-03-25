const audio = typeof window !== 'undefined' && new Audio('/pop.mp3');

export const playPop = (volume = 0.15, rate = 1) => {
  audio.volume = volume;
  audio.playbackRate = rate;
  audio.play();
};