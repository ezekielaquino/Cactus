const initialEmojis = ['🐶', '🐣', '🌸', '🌈', '️🐹', '🦖', '🍒', '🍑', '🥝' , '🍰'];

export const getInitialEmoji = () => {
  return initialEmojis.splice(Math.floor(Math.random() * initialEmojis.length), 1)
};

export const initialEmoji = getInitialEmoji()[0];