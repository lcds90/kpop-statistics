const capitalizeName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

export const defaultObject = {
  channelTitle: '',
  description: '',
  resourceId: { videoId: '' },
  title: '',
  thumbnails: {
    high: { url: '' },
  },
};

export const timeStatistics = (statistics) => Object
  .entries(statistics)
  .filter((s) => !['id', 'ep', 'whoStarted', 'whoEnded'].includes(s[0]))
  .map((s: any) => ({ name: capitalizeName(s[0]), value: s[1].time, fill: s[1].fill })) || [];

export const percentageStatistics = (statistics) => Object
  .entries(statistics)
  .filter((s) => !['id', 'ep', 'whoStarted', 'whoEnded'].includes(s[0]))
  .map((s: any) => ({ name: capitalizeName(s[0]), value: s[1].percentage, fill: s[1].fill })) || [];
