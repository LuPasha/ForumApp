export const sortArrayByCreateAt = (array) => {
  if (array === null || array === undefined) {
    return [];
  }
  const sa = [...array].sort((a, b) => (a.createAt < b.createAt ? -1 : 1));
  return sa;
};

export const sortObjectByCreateAt = (o) => {
  if (o === null || o === undefined) {
    return [];
  }

  const array = Object.values(o);
  const sa = [...array].sort((a, b) => (a.createAt < b.createAt ? -1 : 1));
  return sa;
};
