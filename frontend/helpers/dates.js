const generateNumbers = (min, max) => {
  const results = [];
  for (let i = min; i <= max; i++) {
    results.push(i);
  }
  return results;
};

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const days = generateNumbers(1, 31);
export const years = generateNumbers(1905, new Date().getFullYear()).reverse();
