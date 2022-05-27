const currentLvl = (xp) => {
  if (xp < 100) {
    return 1;
  } else if (xp < 250) {
    return 2;
  } else if (xp < 400) {
    return 3;
  } else if (xp < 600) {
    return 4;
  } else if (xp < 750) {
    return 5;
  } else if (xp < 950) {
    return 6;
  } else if (xp < 1200) {
    return 7;
  } else if (xp < 1500) {
    return 8;
  } else if (xp < 2000) {
    return 9;
  } else {
    return 10;
  }
};
export default currentLvl;
