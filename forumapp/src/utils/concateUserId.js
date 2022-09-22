export const concateUserId = (a, b) => {
  if (a > b) {
    return b + a;
  }
  if (a < b) {
    return a + b;
  }

  if (a === b) {
    return a;
  }
};
