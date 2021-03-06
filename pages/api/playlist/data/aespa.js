export const savage = {
  // 'https://www.youtube.com/watch?v=7ROtgvY_e-A',
  id: '7ROtgvY_e-A',
  ep: 'Savage',
  whoStarted: 'Winter',
  whoEnded: 'Ningning',
  giselle: {
    time: 42.97,
    percentage: 19.62,
    fill: '#5dd06e',
  },
  karina: {
    time: 46.04,
    percentage: 21.03,
    fill: '#d08b5d',
  },
  ningning: {
    time: 57.22,
    percentage: 26.13,
    fill: '#b15dd0',
  },
  winter: {
    time: 72.74,
    percentage: 33.22,
    fill: '#5d63d0',
  },
};

export const nextLevel = {
  // id: 'https://www.youtube.com/watch?v=Wi3JuE4m-Lo',
  id: 'Wi3JuE4m-Lo',
  ep: 'Savage',
  whoStarted: 'Winter',
  whoEnded: 'Ningning',
  giselle: {
    time: 36.34,
    percentage: 21.77,
    fill: '#5dd06e',
  },
  karina: {
    time: 49.32,
    percentage: 29.55,
    fill: '#d08b5d',
  },
  ningning: {
    time: 36.6,
    percentage: 21.93,
    fill: '#b15dd0',
  },
  winter: {
    time: 44.63,
    percentage: 26.74,
    fill: '#5d63d0',
  },
};

const averageCount = (name, type) => {
  const musics = [savage, nextLevel];
  const average = musics
    .reduce((arr, curr) => curr[name][type] + arr, 0);
  return Number((average / musics.length).toFixed(2));
};

// TODO quem canta mais no começo/final
// TODO media de discografias
export const info = {
  wikiQuery: 'aespa',
  extendedPlays: new Set([savage.ep, nextLevel.ep]),
  average: {
    giselle: {
      time: averageCount('giselle', 'time'),
      percentage: averageCount('giselle', 'percentage'),
      fill: '#5dd06e',
    },
    karina: {
      time: averageCount('karina', 'time'),
      percentage: averageCount('karina', 'percentage'),
      fill: '#d08b5d',
    },
    ningning: {
      time: averageCount('ningning', 'time'),
      percentage: averageCount('ningning', 'percentage'),
      fill: '#b15dd0',
    },
    winter: {
      time: averageCount('winter', 'time'),
      percentage: averageCount('winter', 'percentage'),
      fill: '#5d63d0',
    },
  },
};
