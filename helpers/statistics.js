const capitalizeName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

export const timeStatistics = (statistics) => Object
  .entries(statistics)
  .filter((s) => s[0] !== 'id')
  .map((s) => ({ name: capitalizeName(s[0]), value: s[1].time, fill: s[1].fill }));

export const percentageStatistics = (statistics) => Object
  .entries(statistics)
  .filter((s) => s[0] !== 'id')
  .map((s) => ({ name: capitalizeName(s[0]), value: s[1].percentage, fill: s[1].fill }));
