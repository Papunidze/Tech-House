const currentXp = (lvl) => {
  if (lvl <= 1) {
    return 100;
  } else if (lvl <= 2) {
    return 250;
  } else if (lvl <= 3) {
    return 400;
  } else if (lvl <= 4) {
    return 600;
  } else if (lvl <= 5) {
    return 750;
  } else if (lvl <= 6) {
    return 950;
  } else if (lvl <= 7) {
    return 1200;
  } else if (lvl <= 8) {
    return 1500;
  } else if (lvl <= 9) {
    return 2000;
  } else {
    return "Max lvl";
  }
};
export default currentXp;
